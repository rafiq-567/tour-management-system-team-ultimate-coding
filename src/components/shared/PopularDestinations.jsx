"use client";

import React from "react";
import { Globe, Bus, CreditCard, Star } from "lucide-react";

// Sample destinations
const destinations = [
  {
    id: 1,
    name: "Cox's Bazar",
    description:
      "World's longest natural sea beach with golden sands and breathtaking sunsets.",
    price: 800,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    name: "Saint Martin's",
    description:
      "A tropical paradise with crystal-clear water, coral reefs, and palm trees.",
    price: 1000,
    color: "from-orange-400 to-orange-500",
  },
  {
    id: 3,
    name: "Sundarbans",
    description:
      "The largest mangrove forest in the world, home to the Royal Bengal Tiger.",
    price: 1200,
    color: "from-green-500 to-green-600",
  },
  {
    id: 4,
    name: "Srimangal",
    description:
      "The tea capital of Bangladesh with lush green tea gardens and serene nature.",
    price: 700,
    color: "from-red-500 to-red-600",
  },
  {
    id: 5,
    name: "Bandarban",
    description:
      "A hill district full of mountains, tribal culture, and adventure trails.",
    price: 900,
    color: "from-teal-500 to-teal-600",
  },
  {
    id: 6,
    name: "Rangamati",
    description:
      "Famous for Kaptai Lake, hanging bridges, and natural beauty in the Chittagong Hill Tracts.",
    price: 950,
    color: "from-purple-500 to-purple-600",
  },
];

const PopularDestinations = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans p-4 sm:p-8 lg:p-12">
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
          trips, book tours, and explore beautiful locations like Cox's Bazar,
          Saint Martin's, Sundarbans, and more.
        </p>
      </div>

      {/* Destination Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className={`rounded-3xl shadow-xl overflow-hidden p-6 text-white transform hover:scale-105 hover:brightness-110 transition-all duration-300 bg-gradient-to-br ${destination.color}`}
          >
            <div className="flex items-center mb-4 space-x-3">
              {destination.icon}
              <h3 className="text-2xl font-bold">{destination.name}</h3>
            </div>
            <p className="mt-2 mb-4 text-sm font-light">
              {destination.description}
            </p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-semibold">
                Starting from ${destination.price}
              </span>
              <button className="px-5 py-2 bg-white text-blue-600 rounded-full hover:bg-gray-100 transition-colors duration-300 font-semibold shadow-md">
                Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations;
