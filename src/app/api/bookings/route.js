import { ObjectId } from "mongodb";
import dbConnect from "@/lib/dbConnect";

// CREATE BOOKING
export async function POST(req) {
  try {
    const body = await req.json();
    const { tourId, userId, name, email, guests, amount, startDate, endDate, from, to } = body;

    if (!tourId || !userId || !name || !email || !guests || !amount) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const collection = await dbConnect("bookings");

    const existingBooking = await collection.findOne({
      tourId: new ObjectId(tourId),
      userId: new ObjectId(userId),
    });

    if (existingBooking) {
      return Response.json(
        { error: "You have already booked this tour" },
        { status: 400 }
      );
    }

    const newBooking = {
      tourId: new ObjectId(tourId),
      userId: new ObjectId(userId),
      name,
      email,
      guests,
      amount,
      startDate,
      endDate,
      from,
      to,
      status: "pending",
      bookingDate: new Date(),
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newBooking);

    return Response.json({
      success: true,
      booking: { ...newBooking, _id: result.insertedId },
    });
  } catch (err) {
    console.error("POST /bookings error:", err);
    return Response.json({ error: "Failed to create booking" }, { status: 500 });
  }
}

// GET BOOKINGS (filter by userId or tourId)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const tourId = searchParams.get("tourId");

    const collection = await dbConnect("bookings");
    const query = {};

    if (userId) query.userId = new ObjectId(userId);
    if (tourId) query.tourId = new ObjectId(tourId);

    const bookings = await collection.find(query).sort({ createdAt: -1 }).toArray();

    return Response.json(bookings);
  } catch (err) {
    console.error("GET /bookings error:", err);
    return Response.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
