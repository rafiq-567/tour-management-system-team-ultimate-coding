import { ObjectId } from "mongodb";
import dbConnect from "@/lib/dbConnect";

// POST: Create Booking
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      tourId,
      userId,
      name,
      email,
      guests,
      tourName,
      price,
      totalPrice,
      startDate,
      endDate,
      from,
      to,
    } = body;

    // 🧩 Required field check
    if (
      !tourId ||
      !userId ||
      !name ||
      !email ||
      !guests ||
      !tourName ||
      !price ||
      !totalPrice
    ) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const collection = await dbConnect("bookings");

    // ✅ Helper function to safely handle ObjectId
    const safeObjectId = (id) => (ObjectId.isValid(id) ? new ObjectId(id) : id);

    // 🔍 Check if user already booked this tour
    const existingBooking = await collection.findOne({
      tourId: safeObjectId(tourId),
      userId: safeObjectId(userId),
    });

    if (existingBooking) {
      return Response.json(
        { error: "You have already booked this tour" },
        { status: 400 }
      );
    }

    // 🆕 Create new booking document
    const newBooking = {
      tourId: safeObjectId(tourId),
      userId: safeObjectId(userId),
      name,
      email,
      guests,
      tourName,
      price,
      totalPrice,
      startDate,
      endDate,
      from,
      to,
      status: "pending",
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newBooking);

    return Response.json({
      success: true,
      booking: { ...newBooking, _id: result.insertedId },
    });
  } catch (err) {
    console.error("POST /bookings error:", err);
    return Response.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

// GET: Fetch Bookings (filter by userId or tourId)
// GET: Fetch Bookings (filter by userId or tourId)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const tourId = searchParams.get("tourId");

    const collection = await dbConnect("bookings");
    const query = {};

    // ✅ Safe conversion helper (same as POST)
    const safeObjectId = (id) => (ObjectId.isValid(id) ? new ObjectId(id) : id);

    if (userId) query.userId = new ObjectId(userId);
    if (tourId) query.tourId = new ObjectId(tourId);

    const bookings = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json(bookings);
  } catch (err) {
    console.error("GET /bookings error:", err);
    return Response.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
