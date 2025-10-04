"use client";

export default function CheckoutButton({ orderId, amount }) {
  const handleCheckout = async () => {
    const res = await fetch("/api/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId,
        amount,
        name: "John Doe",
        email: "john@example.com",
        
      }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url; // redirect to SSLCOMMERZ
    } else {
      alert("Payment initiation failed");
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      Pay Now
    </button>
  );
}
