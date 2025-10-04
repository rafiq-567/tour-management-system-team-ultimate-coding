"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Plane } from "lucide-react";

// --- Slider Data ---
const SLIDES = [
  {
    id: 1,
    title: "Sunny getaway sale",
    subtitle: "Amazing tours and travel packages",
    cta: "Explore Deals",
    offer: "Up To 40%",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200", // beach
  },
  {
    id: 2,
    title: "Mountain Adventures",
    subtitle: "Trek, hike, and explore nature",
    cta: "Book Now",
    offer: "Save 30%",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200", // mountain
  },
  {
    id: 3,
    title: "City Heritage Tours",
    subtitle: "Discover history and culture",
    cta: "Discover More",
    offer: "Extra Nights Free",
    img: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=1200", // city
  },
];

export default function PromoSlider() {
  const [current, setCurrent] = useState(0);
  const total = SLIDES.length;
  const autoSlideInterval = 5000; // 5s

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, autoSlideInterval);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <div className="w-full  mx-auto px-4 py-8">
      <div className="relative overflow-hidden rounded-2xl shadow-xl h-96">
        {/* Slides */}
        <h1>
          <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Explore the World with SixTour
          </span>
        </h1>

        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            } flex`}
          >
            {/* Left Content */}
            <div className="w-1/2 bg-gradient-to-r from-teal-500 to-sky-500 p-10 flex flex-col justify-center text-white relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 drop-shadow-md">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl mb-6">{slide.subtitle}</p>
              <button className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-full font-semibold text-white transition w-fit shadow-lg">
                {slide.cta}
                <ArrowRight size={18} className="ml-2" />
              </button>

              {/* Decorative flight path + plane */}
              <Plane className="absolute top-40 right-8 text-white/70 animate-bounce" />
            </div>

            {/* Right Image */}
            <div
              className="w-1/2 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              {/* Offer badge */}
              <div className="absolute top-8 right-8 bg-purple-600 text-white px-5 py-4 rounded-full text-center shadow-lg">
                <p className="text-xs uppercase font-semibold">Up To</p>
                <p className="text-2xl font-bold">{slide.offer}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full transition ${
                idx === current
                  ? "bg-orange-500 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
