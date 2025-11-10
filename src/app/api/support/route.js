import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// ✅ CREATE new ticket (user or moderator)
export async function POST(req) {
  try {
    const { db } = await dbConnect();
    const collection = db.collection("supportTickets");

    const body = await req.json();
    const { userId, name, email, subject, message } = body;

    // Ensure required fields
    if (!userId || !subject || !message) {
      return Response.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const newTicket = {
      userId,
      name,
      email,
      subject,
      message,
      status: "Open",
      adminReply: "", // ✅ empty when created
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newTicket);
    const ticket = await collection.findOne({ _id: result.insertedId });

    return Response.json({ success: true, ticket });
  } catch (error) {
    console.error("POST /support error:", error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

// ✅ FETCH tickets (admin = all, user = only theirs)
export async function GET(req) {
  try {
    const { db } = await dbConnect();
    const collection = db.collection("supportTickets");

    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    const filter = userId ? { userId } : {};
    const tickets = await collection.find(filter).sort({ createdAt: -1 }).toArray();

    return Response.json({ success: true, tickets });
  } catch (error) {
    console.error("GET /support error:", error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

// ✅ UPDATE ticket (admin reply or status)
export async function PATCH(req) {
  try {
    const { db } = await dbConnect();
    const collection = db.collection("supportTickets");

    const body = await req.json();
    const { id, adminReply, status } = body;

    if (!id) {
      return Response.json({ success: false, message: "Ticket ID required" }, { status: 400 });
    }

    const update = {};
    if (adminReply !== undefined) update.adminReply = adminReply;
    if (status) update.status = status;

    await collection.updateOne({ _id: new ObjectId(id) }, { $set: update });

    return Response.json({ success: true, message: "Ticket updated successfully" });
  } catch (error) {
    console.error("PATCH /support error:", error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
