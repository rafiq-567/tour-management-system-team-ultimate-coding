// src/app/api/itinerary/generate/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userName, from, to, days, budget } = body;

    // ✅ MongoDB কানেকশন নাও
    const collection = dbConnect("itineraries");

    // 🔹 AI রেসপন্স (demo version)
    const aiResponse = `
✈️ ভ্রমণ পরিকল্পনা
———————————————
📍 স্থান: ${from} → ${to}
📅 সময়কাল: ${days} দিন
💰 বাজেট: ${budget} টাকা
🧭 পরামর্শ:
সকালে সৈকতে হাঁটা, দুপুরে স্থানীয় খাবার উপভোগ, সন্ধ্যায় লাইট শো দেখা।
শুভ যাত্রা, ${userName || "ভ্রমণকারী"}!
`;

    // ✅ MongoDB তে ডেটা সংরক্ষণ করো
    const newPlan = {
      userName,
      from,
      to,
      days,
      budget,
      aiResponse,
      createdAt: new Date(),
    };

    await collection.insertOne(newPlan);

    return NextResponse.json({ success: true, itinerary: newPlan });
  } catch (error) {
    console.error("❌ Error generating itinerary:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
