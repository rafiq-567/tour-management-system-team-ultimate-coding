"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function UserItineraryHistory() {
  const { data: session } = useSession();
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchItineraries = async () => {
      try {
        const res = await fetch(`/api/itinerary/history?email=${session.user.email}`);
        const data = await res.json();
        if (data.success) setItineraries(data.data);
      } catch (err) {
        console.error("Error fetching itineraries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItineraries();
  }, [session?.user?.email]);

  if (loading)
    return <p className="text-center py-6">⏳ Loading your AI Itineraries...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-indigo-600">🗺️ My AI Travel Plans</h1>

      {itineraries.length === 0 ? (
        <p className="text-gray-500">আপনি এখনও কোনো AI Itinerary তৈরি করেননি।</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {itineraries.map((item) => (
            <div key={item._id} className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-1">
                {item.from} → {item.to}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.days} দিন • বাজেট: ৳{item.budget}
              </p>
              <pre className="text-gray-800 dark:text-gray-100 text-sm mt-2">{item.aiResponse}</pre>
              <p className="text-xs text-gray-400 mt-2">
                ⏰ {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
