import useDB from "../../server.js";
import { ObjectId } from "mongodb";
import capitalize from "../../functions/capitalize.js";
export default async function editData(request, response) {
  const { collection, client } = await useDB(
    capitalize(request.params.resource)
  );
  const id = request.params.id;
  if (ObjectId.isValid(id)) {
    const result = await collection.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: request.body },
      { returnDocument: "after" }
    );
    response.status(200);
    response.send(result.value);
    client.close();
  } else {
    response.status(400);
    response.send("Invalid ID");
    client.close();
  }
}
