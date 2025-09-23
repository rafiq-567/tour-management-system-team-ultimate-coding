"use client";

import React, { useState } from "react";
import { Send, User, Mail, MapPin, Calendar } from "lucide-react";

const TravellerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    destination: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Traveller Info:", formData);
    // এখানে তোমার backend API call হবে
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 px-6 sm:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 sm:p-12">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3">
            Traveller Information
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Fill out the form below to let us know about your travel plan.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Full Name
            </label>
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3">
              <User className="text-gray-500 dark:text-gray-300" size={20} />
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent px-3 py-3 focus:outline-none text-gray-800 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Email Address
            </label>
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3">
              <Mail className="text-gray-500 dark:text-gray-300" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent px-3 py-3 focus:outline-none text-gray-800 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Destination */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Destination
            </label>
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3">
              <MapPin className="text-gray-500 dark:text-gray-300" size={20} />
              <input
                type="text"
                name="destination"
                placeholder="Where do you want to go?"
                value={formData.destination}
                onChange={handleChange}
                required
                className="w-full bg-transparent px-3 py-3 focus:outline-none text-gray-800 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Travel Date
            </label>
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3">
              <Calendar className="text-gray-500 dark:text-gray-300" size={20} />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full bg-transparent px-3 py-3 focus:outline-none text-gray-800 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            <Send size={20} /> Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default TravellerForm;
