import useDB from "../../server.js"
import { ObjectId } from "mongodb"
import capitalize from "../../functions/capitalize.js"
export default async function deleteData(request, response) {
  const { collection } = await useDB(capitalize(request.params.resource))
  const id = request.params.id
  if (id) {
    if (!ObjectId.isValid(id)) {
      response.status(400).json({
        message: "Invalid ID",
      })
      return
    }
    collection.deleteOne({ _id: ObjectId(id) })
    response.json({
      message: capitalize(request.params.resource).slice(0, -1) + " with " + id + " has been succesfully deleted!",
    })
  } else {
    response.send("You need to provide an id")
  }
}
