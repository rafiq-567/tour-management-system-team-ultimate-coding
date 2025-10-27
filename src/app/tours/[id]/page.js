"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import BookingModal from "@/components/booking/BookingModal";
import ReviewSection from "@/app/components/review/ReviewSection";
import Swal from "sweetalert2";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function TourDetailsPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userBooking, setUserBooking] = useState(null);

  // ✅ Fetch Tour Details
  useEffect(() => {
    if (!id) return;
    const fetchTour = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/tour-packages/${id}`);
        const data = await res.json();

        if (res.ok) setTour(data);
        else setError(data.error || "Tour not found");
      } catch (err) {
        console.error("Tour fetch error:", err);
        setError("Failed to load tour");
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

  // ✅ Fetch User Booking
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

  // handlewish list  ******************
   const handleWishlist = async () => {
    setLoading(true);
    const res = await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, tour }),
    });
    const data = await res.json();
   Swal.fire({
           position: "top-center",
           icon: "success",
           title: "Wishlist has been successfully added",
           showConfirmButton: false,
           timer: 1500
         });
    setLoading(false);
  };

  if (loading) return <p className="text-center p-6">Loading...</p>;
  if (error) return <p className="text-center p-6 text-red-500">{error}</p>;
  // ✅ Handle Payment (Stripe)
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
          userEmail: session.user.email,
        }),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        console.error("Stripe session creation failed:", data);
        alert(data.error || "Failed to initiate Stripe checkout.");
      }
    } catch (err) {
      console.error("Error in handlePayment:", err);
      alert("Payment request failed. Check console for details.");
    }
  };

  // ✅ Loading / Error states
  if (loading)
    return <p className="text-center p-6 text-gray-500">Loading tour...</p>;

  if (error)
    return <p className="text-center p-6 text-red-500 font-medium">{error}</p>;

  // ✅ Page Content
  return (
    <div className="max-w-5xl mx-auto my-8 p-4 sm:p-6">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/tours"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md rounded-xl shadow hover:bg-white transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Tours
        </Link>
      </div>

      {/* Tour Image */}
      <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden shadow-lg">
        <Image src={tour.image} alt={tour.title} fill className="object-cover" />
      </div>

      {/* Tour Info */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mt-6">
        <h1 className="text-3xl font-bold">{tour.title}</h1>
        <p className="mt-3 text-gray-700 dark:text-gray-300">{tour.description}</p>
        <p className="text-sm mt-2 text-gray-500">Duration: {tour.duration}</p>
        <p className="text-2xl font-semibold text-blue-600 mt-4">${tour.price}</p>

        {/* Booking / Payment Logic */}
        <div className="mt-6">
          {userBooking ? (
            userBooking.status === "pending" ? (
              <button
                disabled
                className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-xl shadow-md cursor-not-allowed"
              >
                Pending Approval
              </button>
            ) : userBooking.status === "approved" ? (
              <button
                onClick={handlePayment}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md"
              >
                Pay Now (${userBooking.totalPrice || tour.price})
              </button>
            ) : (
              <button
                disabled
                className="w-full bg-gray-400 text-white font-semibold py-3 rounded-xl shadow-md cursor-not-allowed"
              >
                {userBooking.status}
              </button>
            )
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-md"
            >
              Book Now
            </button>
          )
        }
        
        <button
        onClick={handleWishlist}
        disabled={loading}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
      >
        {loading ? "Saving..." : "Add to Wishlist ❤️"}
      </button>
      
        </div>

        {/* Booking Modal */}
        {showModal && (
          <BookingModal
            tour={tour}
            tourId={tour._id}
            userId={userId}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <ReviewSection tourId={id} userId={userId} />
      </div>
    </div>
  );
}
