// src/app/api/reviews/route.js
import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// GET reviews by tourId
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const tourId = searchParams.get("tourId");

    const collection = await dbConnect("reviews");

    let query = {};
    if (tourId) {
      query = { tourId: tourId }; // store tourId as string for simplicity
    }

    const reviews = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json(reviews.length ? reviews : []);
  } catch (err) {
    console.error("GET /reviews error:", err);
    return Response.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

// POST new review
export async function POST(req) {
  try {
    const body = await req.json();
    const collection = await dbConnect("reviews");

    const newReview = {
      name: body.name,
      rating: body.rating,
      message: body.message,
      profileImg: body.profileImg || "/default-avatar.png",
      tourId: body.tourId, // store as string
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newReview);
    return Response.json({ ...newReview, _id: result.insertedId });
  } catch (err) {
    console.error("POST /reviews error:", err);
    return Response.json({ error: "Failed to save review" }, { status: 500 });
  }
}
