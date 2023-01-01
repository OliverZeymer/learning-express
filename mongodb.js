import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
export default async function run() {
  try {
    const database = client.db("Webshop");
    // Finds all documents in the customers collection
    const customers = database.collection("Customers");
    // Query to find all documents where the name field has to exist
    const query = {
      name: { $exists: true },
    };
    const options = {
      // sort returned documents in ascending order by title (A->Z)
      sort: { title: 1 },
      // Includes only the name and country fields in the returned document
      projection: { _id: 0, name: 1, country: 1 },
    };

    // finds all documents in the customers collection
    const customerData = customers.find(query, options);

    // print a message if no documents were found
    if ((await customerData.count()) === 0) {
      console.log("No documents found!");
    }
    await customerData.forEach(console.log);
  } finally {
    // Ensures that the client will close on finish/error
    await client.close();
  }
}
