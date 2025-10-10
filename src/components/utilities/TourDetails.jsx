"use client";

import { useState } from "react";
import BookingModal from "@/components/BookingModal";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TourDetails({ tour }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-11/12 mx-auto mt-10">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/tours"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md rounded-xl shadow hover:bg-white transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Tours
        </Link>
      </div>
      {/* Tour Info */}
      <div className="relative w-full md:h-[450px] h-64 mb-4">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="rounded-xl object-cover"
        />
      </div>
      <h2 className="text-3xl font-bold mb-2">{tour.title}</h2>
      <p className="text-gray-500 mb-4">{tour.description}</p>
      <p className="font-semibold mb-4">Duration: {tour.duration}</p>
      <p className="text-blue-600 font-bold mb-6">Price: ${tour.price}</p>

      {/* Book Now Button */}
      <button
        className="font-bold bg-blue-600 px-5 py-2 rounded-xl hover:bg-amber-500 transition"
        onClick={() => setShowModal(true)}
      >
        Book Now
      </button>

      {/* Booking Modal */}
      {showModal && (
        <BookingModal tour={tour} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
