"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";

const Navbar = ({ isDarkMode, onToggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = ["Home", "Destinations", "Packages", "About", "Contact"];

  return (
    <nav className="w-full bg-white dark:bg-gray-800 shadow-lg fixed top-0 left-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          SixTour
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 text-gray-800 dark:text-gray-100 font-medium">
          {menuItems.map((item) => (
            <li
              key={item}
              className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              {item}
            </li>
          ))}
          <li>
            <button className="ml-4 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md transition-all duration-300 font-semibold">
              Login
            </button>
          </li>
          <li>
            <button className="px-5 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 shadow-md transition-all duration-300 font-semibold">
              Book Now
            </button>
          </li>
          <li>
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-100"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </li>
        </ul>

        {/* Mobile Buttons */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-100"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            {isOpen ? (
              <X size={28} className="text-gray-800 dark:text-gray-100" />
            ) : (
              <Menu size={28} className="text-gray-800 dark:text-gray-100" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center space-y-4 py-6 text-gray-800 dark:text-gray-100 border-t border-gray-200 dark:border-gray-700">
          {menuItems.map((item) => (
            <li
              key={item}
              className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </li>
          ))}
          <li className="w-full text-center px-4">
            <button className="w-full mt-2 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md transition-all duration-300 font-semibold">
              Login
            </button>
          </li>
          <li className="w-full text-center px-4">
            <button className="w-full mt-2 px-5 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 shadow-md transition-all duration-300 font-semibold">
              Book Now
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
