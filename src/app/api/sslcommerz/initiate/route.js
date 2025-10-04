import { NextResponse } from "next/server";
import SSLCommerzPayment from "sslcommerz-lts";

const store_id = process.env.SSLCZ_STORE_ID;
const store_passwd = process.env.SSLCZ_STORE_PASSWORD;
const is_live = false; // true for live, false for sandbox

export async function POST(request) {
  try {
    const data = await request.json();

    const tran_id = "REF" + Date.now(); // unique transaction ID

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

    const paymentData = {
      total_amount: data.amount,
      currency: "BDT",
      tran_id: tran_id,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sslcommerz/success`,
      fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sslcommerz/fail`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sslcommerz/cancel`,
      ipn_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sslcommerz/ipn`,
      product_name: "Tour Booking",
      product_category: "Tour",
      product_profile: "general",
      cus_name: data.customer_name,
      cus_email: data.customer_email,
      cus_add1: data.customer_address,
      cus_city: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: data.customer_phone,
      shipping_method: "NO",
      num_of_item: 1,
    };

    const response = await sslcz.init(paymentData);
    return NextResponse.json({ url: response.GatewayPageURL });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
