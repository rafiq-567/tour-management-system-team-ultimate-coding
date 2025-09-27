"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import ReviewSection from "@/app/components/review/ReviewSection";

export default function TourDetailsPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch tour data
  useEffect(() => {
    if (!id) return;

    const fetchTour = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/tour-packages/${id}`);
        const data = await res.json();

        if (res.ok) {
          setTour(data);
          setError("");
        } else {
          setError(data.error || "Package not found");
        }
      } catch (err) {
        setError("Failed to fetch package");
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  if (loading) return <p className="text-center p-6">Loading...</p>;
  if (error) return <p className="text-center p-6 text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto my-8 p-4 sm:p-6">
      {/* Full-width image */}
      <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden shadow-lg">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Tour Info Card */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mt-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {tour.title}
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-3 line-clamp-4">
          {tour.description}
        </p>

        <p className="text-sm text-gray-500 mt-2">Duration: {tour.duration}</p>

        <div className="mt-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100">
            Included Activities:
          </h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2">
            {tour.activities?.map((activity, i) => (
              <li key={i}>{activity}</li>
            ))}
          </ul>
        </div>

        <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mt-4">
          ${tour.price}
        </p>

        {/* Book Now Button */}
        <button
          onClick={() => alert("Redirect to booking or add booking logic")}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-md"
        >
          Book Now
        </button>
      </div>

      {/* Review Section */}
      <div className="mt-8">
        <ReviewSection tourId={id} userId={userId} />
      </div>
    </div>
  );
}
