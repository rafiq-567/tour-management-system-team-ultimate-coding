// File: /app/api/discounts/route.js (for GET & POST)
import dbConnect from "@/lib/dbConnect";

export async function GET(req) {
  try {
    const collection = await dbConnect("discounts");
    const discounts = await collection.find({}).toArray();

    return Response.json({ discounts });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to fetch discounts" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const collection = await dbConnect("discounts");

    const newDiscount = {
      code: (body.code || "").toUpperCase(),
      description: body.description || "",
      value: body.value || 0,
      discountType: body.discountType || "percentage",
      validFrom: body.validFrom || new Date().toISOString(),
      validTo: body.validTo || "2099-12-31",
      status: body.status || "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(newDiscount);

    return Response.json({ success: true, discount: { ...newDiscount, _id: result.insertedId } });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to create discount" }, { status: 500 });
  }
}
