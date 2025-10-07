"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    console.log("Payment session ID:", sessionId);
    // You could fetch the session from your backend here to confirm payment if needed.
  }, [sessionId]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-green-50">
      <h1 className="text-3xl font-bold text-green-700">🎉 Payment Successful!</h1>
      <p className="text-gray-700 mt-4">Thank you for your purchase.</p>
      <p className="text-gray-600 mt-2">Session ID: {sessionId}</p>
    </main>
  );
}
