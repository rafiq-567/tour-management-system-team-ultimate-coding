import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import dbConnect from "@/lib/dbConnect";

export async function POST(request) {
  try {
    const { sessionId } = await request.json();
    
    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const collection = await dbConnect("bookings");
    
    // Find and update the booking with this session ID
    const result = await collection.updateOne(
      { sessionId: sessionId }, // Make sure to store sessionId when creating checkout
      { 
        $set: { 
          paymentStatus: "paid",
          paidAt: new Date(),
          status: "confirmed" // Optional: update overall status too
        } 
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Booking not found or already updated" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Payment status updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update payment error:", error);
    return NextResponse.json(
      { error: "Failed to update payment status" },
      { status: 500 }
    );
  }
}