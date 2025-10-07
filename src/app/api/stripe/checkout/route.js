import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
});

export async function POST(req) {
    try {
        const body = await req.json();
        const { orderId, tourTitle, amount } = body;

        // Validate input
        if (!orderId || !tourTitle || !amount) {
            return NextResponse.json(
                { error: "Missing required fields." },
                { status: 400 }
            );
        }

        const amountInCents = Math.round(parseFloat(amount) * 100);
        if (isNaN(amountInCents) || amountInCents <= 0) {
            return NextResponse.json(
                { error: "Invalid price provided." },
                { status: 400 }
            );
        }

        // Create Stripe Checkout Session
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
                userEmail: user.email, // or userId if available
            },
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/tours/${orderId}`,
        });

        return NextResponse.json(
            { url: session.url },
            { status: 200 }
        );
    } catch (err) {
        console.error("Stripe API Error:", err);
        return NextResponse.json(
            { error: "Failed to create checkout session", details: err.message },
            { status: 500 }
        );
    }
}
