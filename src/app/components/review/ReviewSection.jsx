"use client";
import { useEffect, useState } from "react";
import { ReviewCard } from "./ReviewCard";

export default function ReviewSection({ tourId, userId }) {
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);

  const fetchReviews = async () => {
    const res = await fetch(`/api/reviews?tourId=${tourId}`);
    const data = await res.json();
    setReviews(data);
  };

 const submitReview = async () => {
  if (!message) return alert("Message required");
  if (!userId) return alert("You must be logged in to submit a review");

  try {
    const res = await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify({ tourId, userId, message, rating }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok) return alert(data.error || "Failed to submit review");

    setMessage("");
    setRating(5);
    fetchReviews(); // refresh review list
  } catch (err) {
    console.error(err);
    alert("Failed to submit review");
  }
};


  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-bold">Reviews</h2>

      {/* Add Review */}
      <div className="flex flex-col md:flex-row gap-2 items-center">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your review..."
          className="flex-1 border rounded-xl p-3"
        />
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border rounded-xl p-2"
        >
          {[5,4,3,2,1].map((r) => (
            <option key={r} value={r}>{r} ★</option>
          ))}
        </select>
        <button
          onClick={submitReview}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
        >
          Submit
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length > 0 ? reviews.map((r) => <ReviewCard key={r._id} review={r} />) : <p>No reviews yet.</p>}
      </div>
    </div>
  );
}
