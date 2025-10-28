
import dbConnect from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const { db } = await dbConnect();
    const collection = db.collection("supportTickets");

    const body = await req.json();
    body.status = "Open";
    body.createdAt = new Date();

    const result = await collection.insertOne(body);

    // return the actual inserted document
    const ticket = await collection.findOne({ _id: result.insertedId });

    return Response.json({ success: true, ticket });
  } catch (error) {
    return Response.json({ success: false, message: error.message });
  }
}

export async function GET(req) {
  try {
    const { db } = await dbConnect();
    const collection = db.collection("supportTickets");

    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    const filter = userId ? { userId } : {};
    const tickets = await collection
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json({ success: true, tickets });
  } catch (error) {
    return Response.json({ success: false, message: error.message });
  }
}
