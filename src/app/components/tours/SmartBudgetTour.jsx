"use client";

import { useState } from "react";

export default function SmartBudgetTour() {
  const [budget, setBudget] = useState("");
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTours([]);

    try {
      const res = await fetch("/api/tours/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ budget }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "No tours found.");
      } else {
        setTours(data);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="smart-budget"
      className="max-w-xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl"
    >
      <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">
        🧠 Smart Budget Tour Suggestion
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="number"
          placeholder="Enter your budget (৳)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="flex-1 p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          {loading ? "Finding..." : "Find Tours"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tours.map((tour) => (
          <div
            key={tour._id}
            className="p-4 border rounded-lg shadow hover:shadow-md transition"
          >
            <img
              src={tour.image}
              alt={tour.title}
              className="rounded-lg w-full h-40 object-cover"
            />
            <h3 className="mt-3 text-lg font-semibold">{tour.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {tour.duration}
            </p>
            <p className="mt-2 text-blue-600 font-bold">৳ {tour.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
