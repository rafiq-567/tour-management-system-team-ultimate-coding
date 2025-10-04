import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";


export async function GET(req) {
  try {
    const collection = await dbConnect("tourPackages");
    const popularDestinations = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(8)
      .toArray();

    return new Response(JSON.stringify(popularDestinations), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching popular destinations:", error);
    return new Response("Failed to fetch popular destinations", {
      status: 500,
    });
  }
}
