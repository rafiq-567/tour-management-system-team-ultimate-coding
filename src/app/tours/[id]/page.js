"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import BookingModal from "@/components/booking/BookingModal";
import ReviewSection from "@/app/components/review/ReviewSection";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TourDetailsPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userBooking, setUserBooking] = useState(null);

  // Fetch Tour Details
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
        console.error(err);
        setError("Failed to load tour");
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  // Fetch User Booking
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

  // Handle Payment
  const handlePayment = async (bookingId) => {
    try {
      const res = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      });

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url; // redirect to SSLCOMMERZ payment page
      } else {
        alert("Payment initiation failed");
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong during payment.");
    }
  };

  if (loading)
    return <p className="text-center p-6 text-gray-500">Loading tour...</p>;

  if (error)
    return <p className="text-center p-6 text-red-500 font-medium">{error}</p>;

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
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Tour Info */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mt-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {tour.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-3">
          {tour.description}
        </p>
        <p className="text-sm text-gray-500 mt-2">Duration: {tour.duration}</p>

        <div className="mt-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100">
            Included Activities:
          </h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2">
            {tour.activities?.map((activity, i) => (
              <li key={i}>{activity}</li>
            ))}
          </ul>
        </div>

        <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mt-4">
          ${tour.price}
        </p>

        {/* Booking Button Logic */}
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
                onClick={() => handlePayment(userBooking._id)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md"
              >
                Pay Now
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
          )}
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
