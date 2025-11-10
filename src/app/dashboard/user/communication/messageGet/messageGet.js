"use server";
import dbConnect from "@/lib/dbConnect";

const messageGet = async (data) => {
  // ✅ Await the collection first
  const collection = await dbConnect("messages");
  const result = await collection.find(data).toArray();

  return JSON.stringify(result);
};

export default messageGet;
