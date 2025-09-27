import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const body = await req.json();
    const { tourId, userId, message, rating } = body;

    // Check for missing fields
    if (!tourId || !userId || !message || !rating) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    // Validate ObjectId
    if (!ObjectId.isValid(tourId) || !ObjectId.isValid(userId)) {
      return Response.json({ error: "Invalid tourId or userId" }, { status: 400 });
    }

    const collection = await dbConnect("reviews");

    const newReview = {
      tourId: new ObjectId(tourId),
      userId: new ObjectId(userId),
      message,
      rating: Number(rating), // ensure number
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newReview);

    return Response.json({ success: true, review: { ...newReview, _id: result.insertedId } });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to add review" }, { status: 500 });
  }
}



export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const tourId = searchParams.get("tourId");
    if (!tourId) return Response.json({ error: "Tour ID required" }, { status: 400 });

    const reviewCollection = await dbConnect("reviews");
    const userCollection = await dbConnect("users");

    const reviews = await reviewCollection
      .find({ tourId: new ObjectId(tourId) })
      .sort({ createdAt: -1 })
      .toArray();

    // Populate user info
    const populatedReviews = await Promise.all(
      reviews.map(async (r) => {
        const user = await userCollection.findOne({ _id: new ObjectId(r.userId) });
        return {
          ...r,
          user: { name: user?.name, profileImg: user?.profileImg },
        };
      })
    );

    return Response.json(populatedReviews);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
