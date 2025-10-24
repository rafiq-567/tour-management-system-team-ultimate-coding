"use client";

import React from 'react';
import { Bus, Train, Rocket, Ship, CreditCard, Globe, Star, BedDouble } from "lucide-react";

// Icons mapping with colors
const icons = {
  Bus: <Bus size={36} className="text-blue-500" />,
  Train: <Train size={36} className="text-green-500" />,
  Rocket: <Rocket size={36} className="text-red-500" />,
  Ship: <Ship size={36} className="text-indigo-500" />,
  CreditCard: <CreditCard size={36} className="text-yellow-500" />,
  Globe: <Globe size={36} className="text-teal-500" />,
  Star: <Star size={36} className="text-pink-500" />,
  BedDouble: <BedDouble size={36} className="text-purple-500" />,
};

// Data for the service cards
const services = [
  { iconName: "Bus", title: "Bus", description: "Comfortable bus tours across Bangladesh." },
  { iconName: "Train", title: "Train", description: "Enjoy scenic train journeys to famous destinations." },
  { iconName: "Rocket", title: "Helicopter", description: "Fast and aerial view of top tourist spots." },
  { iconName: "Ship", title: "Launch/Boat", description: "Relaxing boat rides on rivers and lakes." },
  { iconName: "CreditCard", title: "Secure Payments", description: "Your transactions are safe with our secure payment system." },
  { iconName: "Globe", title: "Trusted", description: "Trusted by thousands of travelers across Bangladesh." },
  { iconName: "Star", title: "Reviews", description: "Rated highly by our happy customers for excellent service." },
  { iconName: "BedDouble", title: "Comfortable Stays", description: "Enjoy comfortable stays with all necessary amenities." },
];

const WhyChooseUs = () => {
  return (
    <div className="dark:bg-gray-900 p-8 sm:p-12 lg:p-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold dark:text-gray-100">
          Why Choose Us
        </h2>
        <p className="mt-4 text-lg dark:text-gray-400 max-w-2xl mx-auto">
          We provide the best travel experience with comfort, safety, and satisfaction. Here's why travelers love us:
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-base-300 dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center transform transition-transform duration-300 hover:scale-105"
          >
            <div className="flex justify-center mb-4">
              {icons[service.iconName]}
            </div>
            <h3 className="text-xl font-semibold dark:text-gray-100 mb-2">
              {service.title}
            </h3>
            <p className="dark:text-gray-400 text-sm">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
