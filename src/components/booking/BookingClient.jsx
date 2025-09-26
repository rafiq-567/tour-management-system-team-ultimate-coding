"use client";
import { useState } from "react";


export default function BookingClient({ tour }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="font-bold mb-8 bg-blue-600 px-5 py-2 rounded-xl hover:bg-amber-500 duration-300 transition-all cursor-pointer"
      >
        Book Now
      </button>

      {isOpen && <BookingModal tour={tour} onClose={() => setIsOpen(false)} />}
    </div>
  );
}
