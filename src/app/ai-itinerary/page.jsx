"use client";
import React, { useState } from "react";

export default function AIItineraryPage() {
  const [formData, setFormData] = useState({
    userName: "",
    from: "",
    to: "",
    days: "",
    budget: "",
  });
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState(null);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setItinerary(null);

    try {
      const res = await fetch("/api/itinerary/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.error || "Failed to generate itinerary");

      setItinerary(data.itinerary);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600 dark:text-indigo-400">
          🧠 AI Travel Itinerary Generator
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="তোমার নাম"
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            required
          />
          <input
            name="from"
            value={formData.from}
            onChange={handleChange}
            placeholder="যাত্রা শুরুর স্থান (যেমন: ঢাকা)"
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            required
          />
          <input
            name="to"
            value={formData.to}
            onChange={handleChange}
            placeholder="গন্তব্য (যেমন: কক্সবাজার)"
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            required
          />
          <input
            type="number"
            name="days"
            value={formData.days}
            onChange={handleChange}
            placeholder="কত দিনের ভ্রমণ?"
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            required
          />
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="বাজেট (টাকা)"
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all font-semibold"
          >
            {loading ? "⏳ Generating..." : "✨ Create Itinerary"}
          </button>
        </form>

        {/* Result */}
        <div className="mt-8">
          {loading && (
            <div className="text-center text-gray-600 dark:text-gray-300">
              🧭 AI তোমার ভ্রমণ পরিকল্পনা তৈরি করছে...
            </div>
          )}

          {error && (
            <div className="text-red-600 text-center mt-4">
              ⚠️ {error}
            </div>
          )}

          {itinerary && (
            <div className="mt-6 p-5 bg-indigo-50 dark:bg-gray-800 rounded-lg border border-indigo-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 mb-2">
                ভ্রমণ পরিকল্পনা:
              </h2>
              <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-100">
                {itinerary.aiResponse}
              </pre>
              <p className="text-xs text-gray-500 mt-2">
                তৈরি সময়: {new Date(itinerary.createdAt).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
