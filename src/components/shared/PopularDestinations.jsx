"use client";

import React, { useEffect, useState, useRef } from "react";
import { Globe, Star, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const PopularDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/tour-packages/popular");
      const data = await res.json();
      setDestinations(data);
    };
    fetchData();
  }, []);

  // Auto scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
        // Reset scroll if reach end
        if (
          carouselRef.current.scrollLeft + carouselRef.current.offsetWidth >=
          carouselRef.current.scrollWidth
        ) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Manual scroll
  const scroll = (direction) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: direction === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans p-4 sm:p-8 lg:p-12 relative">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Globe className="text-blue-500 mr-2" size={32} />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-gray-100">
            Popular Destinations in Bangladesh
          </h2>
        </div>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Discover the most amazing tourist spots in Bangladesh! Plan your
          trips, book tours, and explore beautiful locations.
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow hover:scale-110 transition"
        >
          <ChevronLeft className="text-blue-600" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow hover:scale-110 transition"
        >
          <ChevronRight className="text-blue-600" />
        </button>

        {/* Cards Row */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-4"
        >
          {destinations.map((destination, index) => (
            <motion.div
              key={destination._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="min-w-[300px] max-w-[300px] rounded-2xl shadow-lg overflow-hidden relative group cursor-pointer flex-shrink-0"
            >
              {/* Background Image */}
              <img
                src={destination.image}
                alt={destination.title}
                className="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-5 text-white">
                <h3 className="text-xl font-bold">{destination.title}</h3>
                <p className="text-xs text-gray-200 line-clamp-2">
                  {destination.description}
                </p>

                {/* Duration & Rating */}
                <div className="flex items-center justify-between mt-2 text-xs">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star size={14} className="fill-yellow-400" />
                    <span className="text-white">{destination.rating || "4.5"}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-200">
                    <Clock size={14} />
                    <span>{destination.duration || "3 Days / 2 Nights"}</span>
                  </div>
                </div>

                {/* Price + Details */}
                <div className="flex justify-between items-center mt-3">
                  <span className="text-base font-semibold">
                    ${destination.price}
                  </span>
                  <Link
                    href={`/tours/${destination._id}`}
                    className="px-3 py-1 bg-white text-blue-600 rounded-full hover:bg-gray-100 text-xs font-semibold shadow-md"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* All Tour Package Button */}
      <div className="mt-12 flex justify-center">
        <Link
          href="/tours"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-amber-500 hover:text-white transition-colors duration-300 text-center"
        >
          All Tour Package
        </Link>
      </div>
    </div>
  );
};

export default PopularDestinations;
