// app/success/SuccessContent.jsx
"use client"; // MUST be at the very top

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // ✅ Standard Imports here

export default function SuccessContent() {
  // Now, the imports above work correctly because "use client" is at the top.
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // console.log("Session ID from URL:", sessionId); // Keep for local debugging
    
    const updatePaymentStatus = async () => {
      if (!sessionId) {
        setMessage("No session ID found");
        setLoading(false);
        return;
      }

      try {
        // NOTE: If this fetch is to your own API, make sure it uses an absolute URL
        // when deployed (e.g., https://yourdomain.com/api/...)
        const res = await fetch("/api/stripe/update-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const data = await res.json();

        if (res.ok) {
          setMessage("Payment confirmed! Redirecting...");
          setTimeout(() => router.push("/dashboard/user/bookings"), 3000);
        } else {
          // Check server logs for the actual error from your API
          setMessage("Payment verification failed. Please contact support.");
        }
      } catch (error) {
        console.error("Error updating payment:", error);
        setMessage("Error confirming payment. Please check your bookings.");
      } finally {
        setLoading(false);
      }
    };

    updatePaymentStatus();
  }, [sessionId, router]);

  return (
    // Your component JSX goes here
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-green-50">
      <h1 className="text-3xl font-bold text-green-700">🎉 Payment Successful!</h1>
      {loading ? (
        <p className="text-gray-700 mt-4">Confirming your payment...</p>
      ) : (
        <>
          <p className="text-gray-700 mt-4">{message}</p>
          <p className="text-gray-600 mt-2 text-sm">Session ID: {sessionId}</p>
          <button
            onClick={() => router.push("/dashboard/user/bookings")}
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            View My Bookings
          </button>
        </>
      )}
    </main>
  );
}