import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function GET() {
  try {
    const collection = dbConnect("ai_itineraries");
    const data = await collection.find().sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching itineraries:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch itineraries" },
      { status: 500 }
    );
  }
}
