"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sun,
  Moon,
  Menu,
  X,
  Home,
  MapPin,
  Package,
  Info,
  Phone,
  LayoutDashboard,
} from "lucide-react";

import LoginButton from "@/app/components/loginButton/LoginButton";
import PackagesDropdown from "../utilities/PackagesDropdown";

const Navbar = ({ isDarkMode, onToggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [packagesOpen, setPackagesOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close Packages dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setPackagesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { name: "Home", href: "/", icon: <Home size={18} className="mr-2" /> },
    { name: "Destinations", href: "/destinations", icon: <MapPin size={18} className="mr-2" /> },
    { name: "Packages", dropdown: true, icon: <Package size={18} className="mr-2" /> },
    { name: "About", href: "/about", icon: <Info size={18} className="mr-2" /> },
    { name: "Contact", href: "/contact", icon: <Phone size={18} className="mr-2" /> },
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav className="w-full bg-white dark:bg-gray-800 shadow-lg z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          SixTour
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 font-medium">
          {menuItems.map((item) => (
            <li key={item.name} className="relative" ref={item.dropdown ? dropdownRef : null}>
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => setPackagesOpen((prev) => !prev)}
                    className={`flex items-center px-3 py-2 text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200`}
                    aria-haspopup="true"
                    aria-expanded={packagesOpen}
                  >
                    {item.icon} {item.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                        packagesOpen ? "rotate-180" : "rotate-0"
                      }`}
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>

                  {/* Dropdown content */}
                  {packagesOpen && (
                    <div className="absolute left-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-[600px] p-4 z-50">
                      <PackagesDropdown />
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center transition ${
                    isActive(item.href)
                      ? "text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {item.icon} {item.name}
                </Link>
              )}
            </li>
          ))}

          <li>
            <LoginButton />
          </li>

          <li>
            <Link href="/dashboard/admin">
              <button className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-md transition-all duration-300 font-semibold">
                <LayoutDashboard size={18} /> Dashboard
              </button>
            </Link>
          </li>

          <li>
            <button className="px-5 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 shadow-md transition-all duration-300 font-semibold">
              Book Now
            </button>
          </li>

          <li>
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-full text-gray-800 dark:text-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="p-2 rounded-full text-gray-800 dark:text-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <li key={item.name} className="w-full" onClick={() => setIsOpen(false)}>
              {item.dropdown ? (
                <div>
                  <button
                    onClick={() => setPackagesOpen((prev) => !prev)}
                    className="flex items-center w-full px-5 py-2 text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {item.icon} {item.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                        packagesOpen ? "rotate-180" : "rotate-0"
                      }`}
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {packagesOpen && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mt-2 w-full">
                      <PackagesDropdown />
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center px-5 py-2 w-full transition ${
                    isActive(item.href)
                      ? "text-blue-600 dark:text-blue-400 font-semibold"
                      : "hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {item.icon} {item.name}
                </Link>
              )}
            </li>
          ))}

          <li>
            <LoginButton />
          </li>

          <li>
            <Link href="/dashboard/admin">
              <button className="flex items-center gap-2 w-full px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-md transition-all duration-300 font-semibold">
                <LayoutDashboard size={18} /> Dashboard
              </button>
            </Link>
          </li>

          <li>
            <button className="w-full px-5 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 shadow-md transition-all duration-300 font-semibold">
              Book Now
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
