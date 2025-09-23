"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Package, Users, CheckCircle, XCircle } from "lucide-react";

const tourPackages = [
  {
    id: 1,
    title: "Dubai Luxury Tour",
    desc: "5 days, 4 nights with city exploration.",
    available: true,
  },
  {
    id: 2,
    title: "Cox’s Bazar Beach",
    desc: "3 days, 2 nights. Perfect for a quick getaway.",
    available: true,
  },
  {
    id: 3,
    title: "Sajek Valley Adventure",
    desc: "2 days, 1 night in the hills of Bangladesh.",
    available: false,
  },
  {
    id: 4,
    title: "Paris Romantic Escape",
    desc: "7 days, Eiffel Tower & city of love.",
    available: true,
  },
  {
    id: 5,
    title: "Maldives Honeymoon",
    desc: "4 nights, luxury beach resort stay.",
    available: true,
  },
  {
    id: 6,
    title: "Nepal Trekking",
    desc: "6 days Himalayan trekking adventure.",
    available: false,
  },
  {
    id: 7,
    title: "Thailand Bangkok Trip",
    desc: "3 days in Bangkok with shopping & food tour.",
    available: true,
  },
  {
    id: 8,
    title: "Bali Relax Tour",
    desc: "5 days beach & cultural exploration.",
    available: true,
  },
];

const PackagesDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Navbar Link */}
      <div className="flex items-center cursor-pointer text-gray-700 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">
        <Package size={18} className="mr-2" /> Packages
      </div>

      {/* Dropdown Modal */}
      {open && (
        <div className="absolute top-full left-0 mt-2 w-[800px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 z-50">
          {tourPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-xl transition transform hover:scale-[1.02] flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
                  {pkg.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {pkg.desc}
                </p>
              </div>
              <div className="flex items-center justify-between">
                {/* Traveller Icon */}
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                  <Users size={18} /> Travellers
                </div>

                {/* Availability */}
                <div>
                  {pkg.available ? (
                    <span className="flex items-center text-green-600 text-sm font-medium">
                      <CheckCircle size={16} className="mr-1" /> Available
                    </span>
                  ) : (
                    <span className="flex items-center text-red-500 text-sm font-medium">
                      <XCircle size={16} className="mr-1" /> Not Available
                    </span>
                  )}
                </div>
              </div>

              {/* Book Now */}
              <Link
                href={`/packages/${pkg.id}`}
                className={`mt-4 w-full text-center py-2 rounded-lg font-semibold transition ${
                  pkg.available
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }`}
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PackagesDropdown;
