
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  MapPin,
  Package2Icon,
  Info,
  Phone,
  BrainCircuit,
} from "lucide-react";

import { useSession } from "next-auth/react";
import AuthButtons from "../Auth/AuthButtons";
import UserProfileDropdown from "../Auth/UserProfileDropdown";
import ThemeControl from "../themeControl/ThemeControl";
import LinkLogo from "../userClick/LinkLogo";

export default function Navbar() {
  const session = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "Destinations", href: "/destinations", icon: <MapPin size={18} /> },
    { name: "Tour Package", href: "/tours", icon: <Package2Icon size={18} /> },
    { name: "Smart Budget", href: "/smart-budget", icon: <BrainCircuit size={18} /> },


    // 🌟 NEW Smart Budget Tour Feature
    // {
    //   name: "Smart Budget Tour",
    //   href: "/tours/suggest",
    //   icon: <BrainCircuit size={18} />,
    // },

    { name: "Contact", href: "/contact", icon: <Phone size={18} /> },
    { name: "About", href: "/about", icon: <Info size={18} /> },
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav className="w-full backdrop-blur-md shadow-md sticky top-0 z-50 transition-all duration-300 bg-base-100">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <LinkLogo />

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 font-medium">
          {menuItems.map((item) => (
            <li key={item.name}>
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
            </li>
          ))}

          {session?.data?.user ? (
            <UserProfileDropdown session={session} />
          ) : (
            <AuthButtons />
          )}

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
              <Link
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex justify-center items-center gap-2 w-full px-5 py-2 transition ${
                  isActive(item.href)
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {item.icon} {item.name}
              </Link>
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
}
