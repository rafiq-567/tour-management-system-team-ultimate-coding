"use client";
import React from "react";
import { Rocket, Globe, Users } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Jane Doe",
    role: "Lead Tour Planner",
    image: "https://placehold.co/150x150/06B6D4/ffffff?text=JD",
  },
  {
    id: 2,
    name: "John Smith",
    role: "Head of Operations",
    image: "https://placehold.co/150x150/F59E0B/ffffff?text=JS",
  },
  {
    id: 3,
    name: "Emily White",
    role: "Customer Relations Manager",
    image: "https://placehold.co/150x150/8B5CF6/ffffff?text=EW",
  },
];

const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 font-sans p-4 sm:p-8">
      {/* Hero Section */}
      <div className="text-center py-16 md:py-24">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">
          About Us
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          We are dedicated to crafting unforgettable travel experiences. Our
          mission is to make the world accessible, one adventure at a time.
        </p>
      </div>

      {/* Mission & Vision Section */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-6xl mx-auto border border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start p-4 space-y-3">
          <Rocket size={48} className="text-blue-500 mb-2" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Our Mission
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            To provide exceptional tour experiences that inspire and connect
            people with the world's most beautiful and exciting destinations.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-start p-4 space-y-3">
          <Globe size={48} className="text-green-500 mb-2" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Our Vision
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            To be the leading platform for seamless and personalized travel
            planning, recognized for our reliability and innovation.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-start p-4 space-y-3">
          <Users size={48} className="text-purple-500 mb-2" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Our Values
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            We value integrity, customer satisfaction, and a passion for travel.
            We are committed to responsible tourism.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-gray-100">
            Meet the Team
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            The dedicated people behind your next great adventure.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
              />
              <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {member.name}
              </h4>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-semibold">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
