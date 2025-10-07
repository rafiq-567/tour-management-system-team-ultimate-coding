"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import BookingModal from "@/components/booking/BookingModal";
import ReviewSection from "@/app/components/review/ReviewSection";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function TourDetailsPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userBooking, setUserBooking] = useState(null);

  // ✅ Handle Stripe Payment
const handlePayment = async () => {
  if (!tour || !session?.user) {
    alert("You must be logged in to pay.");
    return;
  }
  if (!userBooking || userBooking.status !== "approved") {
    alert("Booking must be approved before payment.");
    return;
  }

  const priceToSend = userBooking.totalPrice || tour.price;
  const numericPrice = parseFloat(priceToSend);

  if (isNaN(numericPrice) || numericPrice <= 0) {
    alert("Invalid price detected.");
    return;
  }

  try {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: userBooking._id,
        tourTitle: tour.title,
        amount: numericPrice,
        userEmail: session.user.email, // ✅ Pass logged-in user's email
      }),
    });

    const data = await res.json();

    if (res.ok && data.url) {
      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } else {
      console.error("Stripe session creation failed:", data);
      alert(data.error || "Failed to initiate Stripe checkout.");
    }
  } catch (err) {
    console.error("Error in handlePayment:", err);
    alert("Payment request failed. Check console for details.");
  }
};


  // Fetch tour details
  useEffect(() => {
    if (!id) return;
    const fetchTour = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/tour-packages/${id}`);
        const data = await res.json();
        if (res.ok) setTour(data);
        else setError(data.error || "Package not found");
      } catch {
        setError("Failed to fetch package");
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

  // Fetch user booking
  useEffect(() => {
    if (!id || !userId) return;
    const fetchBooking = async () => {
      try {
        const res = await fetch(`/api/bookings?userId=${userId}&tourId=${id}`);
        const data = await res.json();
        if (res.ok && data.length > 0) setUserBooking(data[0]);
        else setUserBooking(null);
      } catch (err) {
        console.error("Booking fetch error:", err);
      }
    };
    fetchBooking();
  }, [id, userId]);

  if (loading) return <p className="text-center p-6">Loading...</p>;
  if (error) return <p className="text-center p-6 text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto my-8 p-4 sm:p-6">
      {/* Image */}
      <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden shadow-lg">
        <Image src={tour.image} alt={tour.title} fill className="object-cover" />
      </div>

      {/* Info */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mt-6">
        <h1 className="text-3xl font-bold">{tour.title}</h1>
        <p className="mt-3">{tour.description}</p>
        <p className="text-sm mt-2">Duration: {tour.duration}</p>
        <p className="text-2xl font-semibold text-blue-600 mt-4">
          ${tour.price}
        </p>

        {userBooking ? (
          userBooking.status === "approved" ? (
            <button
              onClick={handlePayment}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl"
            >
              Pay Now (${userBooking.totalPrice || tour.price})
            </button>
          ) : (
            <button
              disabled
              className="mt-6 w-full bg-gray-400 text-white font-semibold py-3 rounded-xl cursor-not-allowed"
            >
              {userBooking.status}
            </button>
          )
        ) : (
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl"
          >
            Book Now
          </button>
        )}

        {showModal && (
          <BookingModal
            tour={tour}
            tourId={tour._id}
            userId={userId}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>

      <div className="mt-8">
        <ReviewSection tourId={id} userId={userId} />
      </div>
    </div>
  );
}
