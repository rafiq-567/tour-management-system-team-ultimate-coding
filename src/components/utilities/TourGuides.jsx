"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const guides = [
  {
    name: "Abdul Karim",
    role: "Senior Tour Guide",
    experience: "8 Years Experience",
    image: "https://i.ibb.co.com/CKZHz6JY/kabir-resume.jpg",
    bio: "Expert in cultural and historical tours across Bangladesh. Known for making every journey educational and fun.",
  },
  {
    name: "Nusrat Jahan",
    role: "Adventure Specialist",
    experience: "5 Years Experience",
    image: "https://i.ibb.co.com/ycRntQYN/mahbubvai.jpg",
    bio: "Loves mountain trails and eco-tourism. Passionate about creating unforgettable adventure experiences.",
  },
  {
    name: "Rafiul Islam",
    role: "Travel Planner",
    experience: "6 Years Experience",
    image: "https://i.ibb.co.com/Myr1KHgt/IMG-20250518-211002.jpg",
    bio: "Ensures every trip runs smoothly from start to finish. Expert in managing group and private tours.",
  },
  {
    name: "Shamima Akter",
    role: "Local Experience Guide",
    experience: "4 Years Experience",
    image: "https://i.ibb.co.com/fYcbLX4H/zabir.jpg",
    bio: "Specializes in showcasing authentic local life and cuisine. Tourists love her storytelling and hospitality.",
  },
];

export default function TourGuides() {
  return (
    <section className=" dark:from-gray-900 dark:to-gray-950 py-16 px-6 sm:px-10 lg:px-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold  dark:text-gray-100">
          Meet Our Expert Tour Guides
        </h2>
        <p className="mt-4 text-lg  dark:text-gray-400 max-w-2xl mx-auto">
          Our professional guides are passionate about travel and committed to
          giving you the best experience possible.
        </p>
      </div>

      {/* Guides Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {guides.map((guide, index) => (
          <motion.div
            key={index}
            className="bg-base-300 dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-full h-64 overflow-hidden">
              <Image
                src={guide.image}
                alt={guide.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold  dark:text-gray-100">
                {guide.name}
              </h3>
              <p className="text-blue-600 dark:text-indigo-400 font-medium">
                {guide.role}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {guide.experience}
              </p>
              <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {guide.bio}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
