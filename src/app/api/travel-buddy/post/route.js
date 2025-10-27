import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const body = await req.json();
    const collection = dbConnect("travel_buddies");

    const newBuddy = {
      from: body.from,
      to: body.to,
      date: body.date,
      budget: body.budget,
      notes: body.notes || "",
      createdAt: new Date(),
    };

    await collection.insertOne(newBuddy);

    return NextResponse.json({
      success: true,
      message: "✅ Travel buddy post created successfully!",
    });
  } catch (error) {
    console.error("❌ Error creating travel buddy post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create post" },
      { status: 500 }
    );
  }
}
