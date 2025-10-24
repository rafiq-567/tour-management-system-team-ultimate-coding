"use client";

import React from 'react';

const testimonials = [
  {
    text: "Amazing tour experience! Everything was organized perfectly and the destinations were breathtaking.",
    name: "Rafiq Ahmed",
    image: "https://placehold.co/100x100/4F46E5/ffffff?text=RA"
  },
  {
    text: "Loved every moment. The booking process was super easy and customer service was excellent!",
    name: "Sabrina Rahman",
    image: "https://placehold.co/100x100/10B981/ffffff?text=SR"
  },
  {
    text: "Highly recommend this service. Comfortable transport and trustworthy tours.",
    name: "Karim Hossain",
    image: "https://placehold.co/100x100/F59E0B/ffffff?text=KH"
  },
  {
    text: "The guides were knowledgeable and friendly. It was a perfect blend of adventure and relaxation.",
    name: "Aisha Khan",
    image: "https://placehold.co/100x100/EF4444/ffffff?text=AK"
  }
];

const TravelersSay = () => {
  return (
    <div className="bg-base-100 dark:bg-gray-900 p-8 sm:p-12 lg:p-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold dark:text-gray-100">
          What Our Travelers Say
        </h2>
        <p className="mt-4 text-lg dark:text-gray-400 max-w-2xl mx-auto">
          Hear from our happy travelers who explored Bangladesh with us. Their experiences inspire you to plan your next adventure confidently!
        </p>
      </div>

      {/* Testimonial Carousel */}
      <div className="flex items-center justify-center space-x-4">
        <div className="flex overflow-x-auto snap-x snap-mandatory space-x-6 px-4 py-8 scrollbar-hide">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 sm:w-96 snap-center bg-base-300 dark:bg-gray-800 p-6 rounded-3xl shadow-lg text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full border-2 border-blue-500 dark:border-indigo-400 object-cover"
                />
              </div>
              <p className="italic dark:text-gray-300 text-base mb-4">
                "{testimonial.text}"
              </p>
              <h3 className="text-lg font-semibold dark:text-gray-100">
                {testimonial.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelersSay;
