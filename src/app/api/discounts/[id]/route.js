// File: /app/api/discounts/[id]/route.js  (for PUT & DELETE)
import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// Update a discount
export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const collection = await dbConnect("discounts");

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(params.id) },
      { $set: { ...body, updatedAt: new Date() } },
      { returnDocument: "after" } // returns updated document
    );

    if (!result.value) {
      return Response.json({ error: "Discount not found" }, { status: 404 });
    }

    return Response.json({ success: true, discount: result.value });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to update discount" }, { status: 500 });
  }
}

// Delete a discount
export async function DELETE(req, { params }) {
  try {
    const collection = await dbConnect("discounts");
    const result = await collection.deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return Response.json({ error: "Discount not found" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to delete discount" }, { status: 500 });
  }
}
