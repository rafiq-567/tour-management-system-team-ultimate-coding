"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import LogoutButton from "@/app/login/compnents/LogoutButton";
import Image from "next/image";

export default function UserProfileDropdown({ session, isMobile }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const user = session?.data?.user;

  return (
    <li
      className={`${isMobile ? "w-full flex justify-center" : "relative"}`}
      ref={dropdownRef}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 focus:outline-none cursor-pointer"
      >
        {user?.image ? (
          <Image
            src={user.image}
            alt={user.name || "User Profile"}
            width={32}
            height={32}
            unoptimized
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-base-300 dark:bg-gray-800 rounded-lg shadow-lg z-50 flex flex-col">
          <span className="px-4 py-2 font-semibold dark:text-gray-100">
            {user?.name || "User"}
          </span>
          <Link
            href="/dashboard/admin"
            className="px-4 py-2 hover:bg-gray-100 hover:text-gray-500"
          >
            Dashboard
          </Link>
          <LogoutButton className="px-4 py-2 text-left hover:bg-gray-100  dark:hover:bg-gray-700" />
        </div>
      )}
    </li>
  );
}
