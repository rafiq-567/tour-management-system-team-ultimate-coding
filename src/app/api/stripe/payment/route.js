import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function GET(req) {
  try {
    // Optional: filter by customer email or metadata
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email"); // e.g. ?email=user@gmail.com

    // List last 20 checkout sessions
    const sessions = await stripe.checkout.sessions.list({
      limit: 20,
    });

    // Filter to only successful ones
    const successful = sessions.data.filter(
      (s) => s.payment_status === "paid"
    );

    // Optionally filter by email if you passed it in metadata
    const filtered = email
      ? successful.filter(
          (s) => s.customer_details?.email === email ||
                 s.metadata?.userEmail === email
        )
      : successful;

    return NextResponse.json({ payments: filtered }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Stripe sessions:", error);
    return NextResponse.json(
      { error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}
