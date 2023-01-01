import useDB from "../../server.js";
import { ObjectId } from "mongodb";
import capitalize from "../../functions/capitalize.js";
import dotenv from "dotenv";
dotenv.config();
export default async function getData(request, response) {
  const { collection, client } = await useDB(
    capitalize(request.params.resource)
  );
  const id = request.params.id;
  const length = await collection.countDocuments();
  const limit = parseInt(request.query.limit) || 20;
  const skip = parseInt(request.query.skip) || 0;
  const nextUrl =
    skip + limit > length
      ? null
      : process.env.HOST_ADDRESS +
        "/api/v1/" +
        request.params.resource +
        `?limit=${limit}&skip=${skip + limit}`;
  const previousUrl =
    skip === 0
      ? null
      : process.env.HOST_ADDRESS +
        "/api/v1/" +
        request.params.resource +
        `?limit=${limit}&skip=${skip - limit < 0 ? 0 : skip - limit}`;
  const getData = async (cheeseID) => {
    try {
      return await collection.find({ _id: ObjectId(cheeseID) }).toArray();
    } catch (error) {
      return null;
    }
  };
  if (id) {
    if (!ObjectId.isValid(id)) {
      response.status(400).json({
        message: "Invalid ID",
      });
      return;
    } else {
      const data = await getData(id);
      if (data) {
        response.status(200).json({
          ...data[0],
          url: process.env.HOST_ADDRESS + request.url,
        });
      } else {
        response.status(404).json({
          message: "ID not found",
        });
      }
    }
  } else {
    const allData = await collection.find().limit(limit).skip(skip).toArray();
    const finalResponse = {
      count: length,
      next: nextUrl,
      previous: previousUrl,
      url: "",
      results: allData,
    };
    response.status(200).json(finalResponse);
  }
  client.close();
  response.end();
}
