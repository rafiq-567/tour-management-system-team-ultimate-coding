import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  const formData = await req.formData();

  const valId = formData.get("val_id");

  try {
    const validate = await axios.get(
      "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php",
      {
        params: {
          val_id: valId,
          store_id: process.env.SSLCZ_STORE_ID,
          store_passwd: process.env.SSLCZ_STORE_PASS,
          format: "json",
        },
      }
    );

    if (validate.data.status === "VALID") {
      // ✅ Payment success → Update your DB here
      return NextResponse.redirect(`${process.env.BASE_URL}/payment/success-page`);
    } else {
      return NextResponse.redirect(`${process.env.BASE_URL}/payment/fail-page`);
    }
  } catch (err) {
    console.error(err);
    return NextResponse.redirect(`${process.env.BASE_URL}/payment/error-page`);
  }
}
