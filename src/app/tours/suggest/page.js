"use client";
import { useState } from "react";

export default function SuggestToursPage() {
  const [budget, setBudget] = useState("");
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTours([]);

    const res = await fetch("/api/tours/suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ budget: Number(budget) }),
    });

    const data = await res.json();
    setTours(data);
    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🎯 Smart Budget Tour Suggestion</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="number"
          placeholder="Enter your budget (৳)"
          className="border rounded px-3 py-2 w-full"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Searching..." : "Find Tours"}
        </button>
      </form>

      {tours.length > 0 ? (
        <ul className="space-y-4">
          {tours.map((tour) => (
            <li key={tour._id} className="border p-4 rounded shadow-sm">
              <h2 className="font-semibold text-lg">{tour.name}</h2>
              <p className="text-gray-600">📍 {tour.location}</p>
              <p className="text-green-700 font-medium">৳ {tour.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p className="text-gray-500">No tours found for this budget.</p>
      )}
    </div>
  );
}
