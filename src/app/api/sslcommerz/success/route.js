import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.formData();
  // Save transaction details in DB
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`);
}
