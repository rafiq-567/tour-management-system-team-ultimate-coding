"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  MapPin,
  Package,
  Info,
  Phone,
  Package2Icon,
  Sun,
  Moon,
} from "lucide-react";

import { useSession } from "next-auth/react";
// import PackagesDropdown from "../utilities/PackagesDropdown";
import AuthButtons from "../Auth/AuthButtons";
import UserProfileDropdown from "../Auth/UserProfileDropdown";
import ThemeControl from "../themeControl/ThemeControl";
import LinkLogo from "../userClick/LinkLogo";

export default function Navbar() {
  const session = useSession();
  const pathname = usePathname();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [packagesOpen, setPackagesOpen] = useState(false);
  const packagesRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (packagesRef.current && !packagesRef.current.contains(e.target)) {
        setPackagesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "Destinations", href: "/destinations", icon: <MapPin size={18} /> },
    // { name: "Packages", dropdown: true, icon: <Package size={18} /> },
    { name: "Tour Package", href: "/tours", icon: <Package2Icon size={18} /> },
    { name: "Contact", href: "/contact", icon: <Phone size={18} /> },
    { name: "About", href: "/about", icon: <Info size={18} /> },
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav className="w-full backdrop-blur-md shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <LinkLogo />

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 font-medium">
          {menuItems.map((item) => (
            <li key={item.name} className="relative" ref={item.dropdown ? packagesRef : null}>
              {item.dropdown ? (
                <div>
                  <button
                    onClick={() => setPackagesOpen(!packagesOpen)}
                    className="flex items-center gap-2 text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1 rounded-md"
                  >
                    {item.icon} {item.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-4 h-4 transition-transform ${packagesOpen ? "rotate-180" : "rotate-0"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {packagesOpen && (
                    <div className="absolute left-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 z-40">
                      {/* <PackagesDropdown /> */}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 px-2 py-1 rounded-md transition ${
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

          {session?.data?.user ? <UserProfileDropdown session={session} /> : <AuthButtons />}

          <li>
            <ThemeControl />
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3">
          <ThemeControl />
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 focus:outline-none text-gray-800 dark:text-gray-100"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center space-y-4 py-5 text-gray-800 dark:text-gray-100 border-t border-gray-200 dark:border-gray-700">
          {menuItems.map((item) => (
            <li key={item.name} className="w-full text-center">
              {item.dropdown ? (
                <button
                  onClick={() => setPackagesOpen(!packagesOpen)}
                  className="flex justify-center items-center gap-2 w-full px-5 py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {item.icon} {item.name}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`flex justify-center items-center gap-2 w-full px-5 py-2 transition ${
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

          {session?.data?.user ? <UserProfileDropdown session={session} isMobile /> : <AuthButtons isMobile />}
        </ul>
      </div>
    </nav>
  );
}
