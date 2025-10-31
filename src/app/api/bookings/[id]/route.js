
import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function PATCH(req, context) {
  try {
    const { params } = context;
    const { id } = params;
    const { status } = await req.json();

    // ✅ Validate input
    if (!id || !ObjectId.isValid(id)) {
      return Response.json({ error: "Invalid booking ID" }, { status: 400 });
    }

    if (!["pending", "approved", "rejected", "paid"].includes(status)) {
      return Response.json({ error: "Invalid status" }, { status: 400 });
    }

    // ✅ Connect to DB and get collection
    const collection = await dbConnect("bookings");

    // ✅ Update booking
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    if (result.matchedCount === 0) {
      return Response.json({ error: "Booking not found" }, { status: 404 });
    }

    return Response.json({ success: true, status });
  } catch (err) {
    console.error("PATCH /bookings/[id] error:", err);
    return Response.json({ error: "Failed to update booking" }, { status: 500 });
  }
}
