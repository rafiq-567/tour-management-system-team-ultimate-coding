"use client";

import React from "react";
import Link from "next/link";

const UserDashboard = () => {
  // Example data (you can fetch from API later)
  const upcomingTours = [
    { id: 1, name: "Sundarbans Adventure", date: "2025-11-05" },
    { id: 2, name: "Cox's Bazar Beach Trip", date: "2025-11-20" },
  ];

  const pastTours = [
    { id: 1, name: "Srimangal Tea Garden", date: "2025-09-10" },
  ];

  return (
    <div className="p-6">
      {/* Welcome Header */}
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Welcome, User!
      </h1>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Link
          href="/tours"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Book a Tour
        </Link>
        <Link
          href="/destinations"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          View Destinations
        </Link>
        <Link
          href="/my-bookings"
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          My Bookings
        </Link>
      </div>

      {/* Upcoming Tours */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-700 dark:text-gray-200">
          Upcoming Tours
        </h2>
        {upcomingTours.length > 0 ? (
          <ul className="space-y-2">
            {upcomingTours.map((tour) => (
              <li
                key={tour.id}
                className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {tour.name}
                  </span>
                  <span className="text-gray-500 dark:text-gray-300">
                    {tour.date}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No upcoming tours.</p>
        )}
      </div>

      {/* Past Tours */}
      <div>
        <h2 className="text-2xl font-semibold mb-2 text-gray-700 dark:text-gray-200">
          Past Tours
        </h2>
        {pastTours.length > 0 ? (
          <ul className="space-y-2">
            {pastTours.map((tour) => (
              <li
                key={tour.id}
                className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {tour.name}
                  </span>
                  <span className="text-gray-500 dark:text-gray-300">
                    {tour.date}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No past tours.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
