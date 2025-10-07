import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email"); // optional filter

    // Fetch last 50 checkout sessions
    const sessions = await stripe.checkout.sessions.list({ limit: 50 });

    // Only successful payments
    const successful = sessions.data.filter(s => s.payment_status === "paid");

    // Filter by email if provided
    const filtered = email
      ? successful.filter(
          s => s.customer_details?.email === email || s.metadata?.userEmail === email
        )
      : successful;

    return NextResponse.json({ payments: filtered }, { status: 200 });
  } catch (err) {
    console.error("Error fetching payments:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch payments" }, { status: 500 });
  }
}
