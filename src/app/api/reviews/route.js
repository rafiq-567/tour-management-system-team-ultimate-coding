

import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// ----------------- POST (Add Review) -----------------
export async function POST(req) {
  try {
    const body = await req.json();
    const { tourId, userId, message, rating } = body;

    // Validation
    if (!tourId || !userId || !message || !rating) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (!ObjectId.isValid(tourId) || !ObjectId.isValid(userId)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid tourId or userId" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (typeof message !== "string" || message.trim().length < 3) {
      return new Response(
        JSON.stringify({ success: false, error: "Review message too short" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const numericRating = Number(rating);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return new Response(
        JSON.stringify({ success: false, error: "Rating must be between 1 and 5" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const reviewsCollection = await dbConnect("reviews");

    // Optional: prevent duplicate reviews
    const existing = await reviewsCollection.findOne({
      tourId: new ObjectId(tourId),
      userId: new ObjectId(userId),
    });
    if (existing) {
      return new Response(
        JSON.stringify({ success: false, error: "You have already reviewed this tour" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const newReview = {
      tourId: new ObjectId(tourId),
      userId: new ObjectId(userId),
      message: message.trim(),
      rating: numericRating,
      createdAt: new Date(),
    };

    const result = await reviewsCollection.insertOne(newReview);

    return new Response(
      JSON.stringify({
        success: true,
        review: { ...newReview, _id: result.insertedId },
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("POST /reviews error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to add review" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// ----------------- GET (Fetch Reviews) -----------------
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const tourId = searchParams.get("tourId");

    if (!tourId) {
      return new Response(
        JSON.stringify({ success: false, error: "Tour ID required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (!ObjectId.isValid(tourId)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid tourId" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const reviewCollection = await dbConnect("reviews");
    const userCollection = await dbConnect("users");

    const reviews = await reviewCollection
      .find({ tourId: new ObjectId(tourId) })
      .sort({ createdAt: -1 })
      .toArray();

    // Populate user info
    const populatedReviews = await Promise.all(
      reviews.map(async (r) => {
        const user = await userCollection.findOne(
          { _id: new ObjectId(r.userId) },
          { projection: { name: 1, profileImg: 1 } }
        );
        return {
          ...r,
          user: {
            name: user?.name || "Anonymous",
            image: user?.profileImg || null,
          },
        };
      })
    );

    return new Response(
      JSON.stringify({ success: true, reviews: populatedReviews }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("GET /reviews error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch reviews" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
