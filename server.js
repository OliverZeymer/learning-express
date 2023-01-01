import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function useDB(collectionName) {
  await client.connect();
  console.log("Database connected successfully");
  const db = client.db("Webshop");
  const collection = db.collection(collectionName);
  return { collection, client };
}
