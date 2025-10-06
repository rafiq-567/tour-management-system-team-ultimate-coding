"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import BookingModal from "@/components/booking/BookingModal";
import ReviewSection from "@/app/components/review/ReviewSection";


export default function TourDetailsPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userBooking, setUserBooking] = useState(null);


  const handlePayment = async () => {
    if (!tour || !session?.user) return;
    if (!userBooking || userBooking.status !== "approved" || !session?.user) return;

    try {
      const res = await fetch("/api/payment/init", {
   method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // 1. Pass the database ID of the Booking (Order)
        order_id: userBooking._id, 
        // 2. Pass the unique transaction ID (MUST be generated and saved during the initial booking process)
        // ASSUMPTION: The booking object (userBooking) now includes a 'tran_id' field.
        tran_id: userBooking.tran_id, 
        
        // Payment details
        amount: userBooking.totalPrice || tour.price, // Use actual booking price if available
        product_name: tour.title,
        
        // Customer details
        customer_name: session.user.name,
        customer_email: session.user.email,
        customer_address: "Dhaka", // Can be dynamic later
        customer_phone: "01711111111", // Can be dynamic later
      }),
    });

      const data = await res.json();

      if (data.url) {
        // redirect user to SSLCommerz payment page
        window.location.href = data.url;
      } else {
        console.error("Payment initiation failed:", data);
        alert("Failed to initiate payment. Check console for details.");
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
        if (res.ok) {
          setTour(data);
          setError("");
        } else {
          setError(data.error || "Package not found");
        }
      } catch (err) {
        setError("Failed to fetch package");
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  // Fetch user booking for this tour
  useEffect(() => {
    if (!id || !userId) return;

    const fetchBooking = async () => {
      try {
        const res = await fetch(`/api/bookings?userId=${userId}&tourId=${id}`);
        const data = await res.json();
        if (res.ok && data.length > 0) {
          setUserBooking(data[0]); // take first booking
        } else {
          setUserBooking(null);
        }
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
        {userBooking ? (
          userBooking.status === "pending" ? (
            <button
              disabled
              className="mt-6 w-full bg-yellow-500 text-white font-semibold py-3 rounded-xl shadow-md cursor-not-allowed"
            >
              Pending Approval
            </button>
          ) : userBooking.status === "approved" ? (
            <button
              onClick={handlePayment}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md"
            >
              Pay Now
            </button>
          ) : (
            <button
              disabled
              className="mt-6 w-full bg-gray-400 text-white font-semibold py-3 rounded-xl shadow-md cursor-not-allowed"
            >
              {userBooking.status}
            </button>
          )
        ) : (
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-md"
          >
            Book Now
          </button>
        )}

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

      {/* Reviews */}
      <div className="mt-8">
        <ReviewSection tourId={id} userId={userId} />
      </div>
    </div>
  );
}
