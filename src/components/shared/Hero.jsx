"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [people, setPeople] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", { destination, date, people });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -100 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
        alt="Beach Sunset"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content with Framer Motion */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h2
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 drop-shadow-lg"
          variants={itemVariants}
        >
          Discover Your Next Adventure
        </motion.h2>
        <motion.p
          className="text-sm sm:text-lg lg:text-xl font-light max-w-2xl mx-auto opacity-90 drop-shadow-md"
          variants={itemVariants}
        >
          Plan trips, book tours, explore destinations easily
        </motion.p>

        {/* Search Bar */}
        <motion.form
          onSubmit={handleSearch}
          className="mt-8 w-full max-w-4xl px-2 sm:px-6"
          variants={itemVariants}
        >
          <div className="bg-white/95 rounded-2xl sm:rounded-full p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shadow-lg">
            <input
              type="text"
              placeholder="Destination"
              className="flex-1 px-5 py-3 rounded-xl sm:rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <input
              type="date"
              className="flex-1 px-5 py-3 rounded-xl sm:rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="number"
              min="1"
              placeholder="Guests"
              className="flex-1 sm:w-32 px-5 py-3 rounded-xl sm:rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl sm:rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md"
            >
              <Search className="h-5 w-5" />
              Search
            </button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Hero;
