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
  Package2Icon,
} from "lucide-react";

import { useSession } from "next-auth/react";

import AuthButtons from "../Auth/AuthButtons";
import PackagesDropdown from "../utilities/PackagesDropdown";
import UserProfileDropdown from "../Auth/UserProfileDropdown";
import LinkLogo from "../userClick/LinkLogo";

const Navbar = ({ isDarkMode, onToggleDarkMode }) => {
  const session = useSession();
  const pathname = usePathname();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [packagesOpen, setPackagesOpen] = useState(false);
  const packagesRef = useRef(null);

  // Close Packages dropdown if clicked outside
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
    { name: "Home", href: "/", icon: <Home size={18} className="mr-2" /> },
    {
      name: "Destinations",
      href: "/destinations",
      icon: <MapPin size={18} className="mr-2" />,
    },
    {
      name: "Packages",
      dropdown: true,
      icon: <Package size={18} className="mr-2" />,
    },
    {
      name: "Tour Package",
      href: "/tours",
      icon: <Package2Icon size={18} className="mr-2" />,
    },

    {
      name: "Contact",
      href: "/contact",
      icon: <Phone size={18} className="mr-2" />,
    },
    {
      name: "About",
      href: "/about",
      icon: <Info size={18} className="mr-2" />,
    },
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <LinkLogo></LinkLogo>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-5 font-medium">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className="relative"
              ref={item.dropdown ? packagesRef : null}
            >
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => setPackagesOpen(!packagesOpen)}
                    className="flex items-center px-3 py-2 text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
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
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {packagesOpen && <PackagesDropdown />}
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

          {/* Auth buttons or profile dropdown */}
          {session?.data?.user ? (
            <UserProfileDropdown session={session} />
          ) : (
            <AuthButtons />
          )}

          <li>
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-full text-gray-800 dark:text-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </li>
        </ul>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center space-x-2">
          <button onClick={onToggleDarkMode} className="p-2 rounded-full">
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "max-h-full opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center space-y-4 py-6 text-gray-800 dark:text-gray-100 border-t border-gray-200 dark:border-gray-700">
          {menuItems.map((item) => (
            <li key={item.name} className="w-full">
              {item.dropdown ? (
                <div>
                  <button
                    onClick={() => setPackagesOpen(!packagesOpen)}
                    className="flex items-center w-full px-5 py-2 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {item.icon} {item.name}
                  </button>
                  {packagesOpen && <PackagesDropdown />}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center w-full px-5 py-2 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {item.icon} {item.name}
                </Link>
              )}
            </li>
          ))}

          {session?.data?.user ? (
            <UserProfileDropdown session={session} isMobile />
          ) : (
            <AuthButtons isMobile />
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
