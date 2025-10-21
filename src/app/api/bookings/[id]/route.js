import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    console.log(id)
    const { status } = await req.json();

    if (!["pending", "approved", "rejected", "paid"].includes(status)) {
      return Response.json({ error: "Invalid status" }, { status: 400 });
    }

    const collection = await dbConnect("bookings");
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    if (result.matchedCount === 0) {
      return Response.json({ error: "Booking not found" }, { status: 404 });
    }

    return Response.json({ success: true, status });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to update booking" }, { status: 500 });
  }
}
