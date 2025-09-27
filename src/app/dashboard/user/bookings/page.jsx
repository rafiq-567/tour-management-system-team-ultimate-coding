"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function MyBookingsPage() {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(`/api/bookings?userId=${session.user.id}`);
        const data = await res.json();
        if (res.ok) {
          setBookings(data);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session?.user?.id]);

  if (status === "loading" || loading)
    return <p className="text-center p-6">Loading your bookings...</p>;

  if (!session)
    return (
      <p className="text-center p-6 text-red-500">
        Please <Link href="/login" className="underline">login</Link> to see your bookings.
      </p>
    );

  if (bookings.length === 0)
    return (
      <p className="text-center p-6 text-gray-500">
        You don’t have any bookings yet.
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {booking.title}
              </h2>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-lg ${
                  booking.status === "pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : booking.status === "approved"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {booking.status}
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {booking.description}
            </p>

            <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              <p><strong>Price:</strong> ${booking.price}</p>
              <p><strong>Guests:</strong> {booking.guests}</p>
              <p><strong>Booked On:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
            </div>

            {booking.status === "approved" && (
              <button
                onClick={() => alert("Redirect to payment page")}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Pay Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
