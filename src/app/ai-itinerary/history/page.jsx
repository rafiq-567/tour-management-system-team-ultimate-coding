imp"use client";
import React, { useEffect, useState } from "react";

export default function ItineraryHistoryPage() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const res = await fetch("/api/itinerary/history");
        const data = await res.json();
        if (data.success) setItineraries(data.data);
      } catch (err) {
        console.error("Error loading itineraries:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItineraries();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-700 dark:text-gray-200">
        ⏳ Loading your travel history...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600 dark:text-indigo-400">
          🗺️ My AI Travel History
        </h1>

        {itineraries.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            এখনো কোনো Itinerary তৈরি করো নি 😅
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {itineraries.map((item) => (
              <div
                key={item._id}
                className="p-5 bg-indigo-50 dark:bg-gray-800 rounded-xl border border-indigo-200 dark:border-gray-700 shadow-sm"
              >
                <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
                  {item.from} → {item.to}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {item.userName} • {item.days} দিন • বাজেট: ৳{item.budget}
                </p>
                <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-100 text-sm mb-3">
                  {item.aiResponse}
                </pre>
                <p className="text-xs text-gray-500">
                  ⏰ {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

