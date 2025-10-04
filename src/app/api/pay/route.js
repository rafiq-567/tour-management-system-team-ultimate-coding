import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  const body = await req.json();

  const { orderId, amount, name, email, phone } = body;

  const payload = {
    store_id: process.env.SSLCZ_STORE_ID,
    store_passwd: process.env.SSLCZ_STORE_PASS,
    total_amount: amount,
    currency: "BDT",
    tran_id: orderId,
    success_url: `${process.env.BASE_URL}/api/payment/success`,
    fail_url: `${process.env.BASE_URL}/api/payment/fail`,
    cancel_url: `${process.env.BASE_URL}/api/payment/cancel`,

    // Required customer info
    cus_name: name,
    cus_email: email,
    cus_add1: "Dhaka",
    cus_city: "Dhaka",
    cus_country: "Bangladesh",
    cus_phone: phone,

    // Required shipping info
    ship_name: name,
    ship_add1: "Dhaka",
    ship_city: "Dhaka",
    ship_country: "Bangladesh",

    // Product info
    product_name: "Tour Booking",
    product_category: "Travel",
    product_profile: "general",
  };

  try {
    const response = await axios.post(
      "https://sandbox.sslcommerz.com/gwprocess/v3/api.php",
      payload
    );

    console.log("SSLCOMMERZ raw response:", response.data);

    const { GatewayPageURL } = response.data;

    if (GatewayPageURL) {
      return NextResponse.json({ url: GatewayPageURL });
    } else {
      return NextResponse.json(
        { error: "Failed to get GatewayPageURL", details: response.data },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("SSLCOMMERZ error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Payment initiation error", details: error.response?.data || error.message },
      { status: 500 }
    );
  }
}
