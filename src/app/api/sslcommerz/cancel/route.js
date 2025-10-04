import { NextResponse } from "next/server";

export async function POST(request) {
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment-cancel`);
}
