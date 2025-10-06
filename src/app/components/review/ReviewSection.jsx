"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ReviewCard } from "./ReviewCard";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Loading from "@/components/utilities/Loading";

export default function ReviewSection({ tourId }) {
  const { data: session, status } = useSession();
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Fetch reviews
  const fetchReviews = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/reviews?tourId=${tourId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load reviews");
      setReviews(data.reviews || []);
    } catch (err) {
      console.error(err);
      setError("Could not load reviews. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tourId) fetchReviews();
  }, [tourId]);

  // Submit review
  const submitReview = async () => {
    if (!message.trim()) return setError("Please write a review message.");
    if (!session?.user) return setError("You must be logged in to submit a review.");

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        body: JSON.stringify({
          tourId,
          userId: session.user.id, // ✅ from NextAuth session
          name: session.user?.name,
          image: session.user?.image,
          message,
          rating,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to submit review");

      setMessage("");
      setRating(5);
      fetchReviews();
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

      {/* Add Review */}
      {status === "authenticated" ? (
        <div className="bg-white rounded-2xl shadow p-5 space-y-3 mb-6">
          <h3 className="text-lg font-semibold">Write a Review</h3>

          {/* Logged in user info */}
          <div className="flex items-center gap-3">
            <Image
              src={session.user?.image || "/default-avatar.png"}
              alt={session.user?.name || "User"}
              width={40}
              height={40}
              className="rounded-full border"
            />
            <p className="font-medium">{session.user.name}</p>
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your experience..."
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none"
            rows={3}
          />

          {/* Rating Dropdown */}
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border rounded-xl p-2"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} ★
              </option>
            ))}
          </select>

          <button
            onClick={submitReview}
            disabled={submitting}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl flex items-center gap-2 disabled:opacity-70"
          >
            {submitting && <Loader2 className="animate-spin w-4 h-4" />}
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      ) : (
        <p className="text-gray-500 italic mb-6">
          Please <span className="text-green-600 font-medium">login</span> to write a review.
        </p>
      )}

      {/* Reviews List */}
      <div>
        {loading ? (
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <Loading></Loading>
          </div>
        ) : reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((r) => (
              <ReviewCard key={r._id} review={r} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first to write one!</p>
        )}
      </div>
    </div>
  );
}
