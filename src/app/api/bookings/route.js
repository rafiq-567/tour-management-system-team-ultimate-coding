import { ObjectId } from "mongodb";
import dbConnect from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const body = await req.json();
    const { tourId, userId, name, email, guests, amount, status } = body;

    if (!tourId || !userId || !name || !email || !guests || !amount) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const collection = await dbConnect("bookings");

    // Check if the user already booked this tour
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
      amount,                     // 💰 save price/amount
      status: status || "pending", // default pending
      bookingDate: new Date(),     // 📅 keep booking date
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newBooking);

    return Response.json({
      success: true,
      booking: { ...newBooking, _id: result.insertedId },
    });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

// GET all bookings (optional, can filter by userId or tourId)


export async function GET() {
  try {
    const collection = await dbConnect("bookings");
    const bookings = await collection.find({}).sort({ createdAt: -1 }).toArray();
    return Response.json(bookings);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

