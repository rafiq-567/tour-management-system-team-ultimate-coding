import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.redirect(`${process.env.BASE_URL}/payment/fail-page`);
}
