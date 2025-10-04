import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.formData();
  // Handle IPN notification (update payment status in DB)
  return NextResponse.json({ received: true });
}
