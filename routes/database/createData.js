import useDB from "../../server.js"
import capitalize from "../../functions/capitalize.js"
export default async function createData(request, response) {
  const isArray = Array.isArray(request.body)
  const { collection, client } = await useDB(capitalize(request.params.resource))
  const singleObject = [Object.assign({}, request.body)]
  const data = isArray ? request.body : singleObject
  try {
    if (isArray === false) {
      const result = await collection.insertOne(data[0])
      response
        .status(201)
        .json({
          message: capitalize(request.params.resource).slice(0, -1) + " with ID: " + result.insertedId + " succesfully created!",
        })
        .end()
      return
    }
    const result = await collection.insertMany(data)
    response
      .status(201)
      .json({
        message: capitalize(request.params.resource).slice(0, -1) + " with ID: " + result.insertedIds[0] + " succesfully created!",
      })
      .end()
  } catch (error) {
    response.status(500).json({ message: "Something went wrong" })
  }

  client.close()
}
