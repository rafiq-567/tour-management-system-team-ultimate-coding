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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Tour Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Price</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Guests</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Total</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Booked On</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Status</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-4 py-3 text-gray-800 dark:text-gray-100">{booking.title || booking.tourName}</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">${booking.price}</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{booking.guests}</td>
                <td className="px-4 py-3 text-gray-800 dark:text-gray-100 font-semibold">
                  ${(booking.price * booking.guests).toFixed(2)}
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
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
                </td>
                <td className="px-4 py-3 text-center">
                  {booking.status === "approved" ? (
                    <button
                      onClick={() => alert("Redirect to payment page")}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                    >
                      Pay Now
                    </button>
                  ) : (
                    <span className="text-gray-400 text-sm">No Action</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
