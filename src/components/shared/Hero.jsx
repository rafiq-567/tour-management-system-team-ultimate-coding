"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

const Hero = () => {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [people, setPeople] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", { destination, date, people });
    // Add your search logic here
  };

  return (
    <div className="relative w-full h-96 sm:h-[400px] lg:h-[500px] overflow-hidden">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
        alt="Beach Sunset"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-2 drop-shadow-lg">
          Discover Your Next Adventure
        </h2>
        <p className="mt-2 text-base sm:text-lg lg:text-xl font-light max-w-2xl mx-auto opacity-90 drop-shadow-md">
          Plan trips, book tours, explore destinations easily
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-8 w-full max-w-3xl">
          <div className="bg-white/95 rounded-full p-2 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 shadow-lg">
            <input
              type="text"
              placeholder="Destination"
              className="w-full sm:w-1/3 px-5 py-3 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <input
              type="date"
              placeholder="mm/dd/yyyy"
              className="w-full sm:w-1/3 px-5 py-3 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="text"
              placeholder="Guests"
              className="w-full sm:w-1/6 px-5 py-3 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Hero;
