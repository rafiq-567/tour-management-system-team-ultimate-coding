import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function POST(req) {
  try {
    const { orderId, tourTitle, amount, userEmail } = await req.json();

    if (!orderId || !tourTitle || !amount || !userEmail) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const amountInCents = Math.round(parseFloat(amount) * 100);
    if (isNaN(amountInCents) || amountInCents <= 0) {
      return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: tourTitle },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        orderId,
        userEmail,
        tourTitle,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/tours/${orderId}`,
    });

    return NextResponse.json({ url: session.url, sessionId: session.id }, { status: 200 });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: err.message || "Failed to create session" }, { status: 500 });
  }
}
