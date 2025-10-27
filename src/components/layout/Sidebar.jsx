"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Home,
  Users,
  Calendar,
  Plane,
  CreditCard,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  Heart,
  Ticket,
  Handshake,
  BedDouble,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";

// Utility for joining classes
const cn = (...classes) => classes.filter(Boolean).join(" ");

// ======================
// Role-Based Menu Items
// ======================
const menuItems = [
  // Admin & Moderator
  {
    name: "Dashboard",
    icon: Home,
    href: "/dashboard/admin",
    roles: ["admin", "moderator"],
  },
  {
    name: "All Tours",
    icon: Plane,
    href: "/dashboard/admin/all",
    roles: ["admin", "moderator"],
  },
  {
    name: "Bookings",
    icon: Calendar,
    href: "/dashboard/moderator/bookings",
    roles: ["admin", "moderator"],
  },
  {
    name: "Payments",
    icon: CreditCard,
    href: "/dashboard/payments",
    roles: ["admin", "moderator"],
  },

  // Admin Only
  {
    name: "Add Tour",
    icon: Plane,
    href: "/dashboard/admin/add-tour",
    roles: ["admin"],
  },
  {
    name: "Discounts",
    icon: Ticket,
    href: "/dashboard/admin/discounts",
    roles: ["admin"],
  },
  {
    name: "Users Management",
    icon: Users,
    href: "/dashboard/admin/users",
    roles: ["admin"],
  },
  {
    name: "Analytics",
    icon: BarChart3,
    href: "/dashboard/admin/analytics",
    roles: ["admin"],
  },

  // All Users
  {
    name: "Travel Buddy",
    icon: Handshake,
    href: "/dashboard/user/travel-buddy",
    roles: ["admin", "moderator", "user"],
  },
  {
    name: "My Bookings",
    icon: Calendar,
    href: "/dashboard/user/bookings",
    roles: ["admin", "moderator", "user"],
  },
  {
    name: "Rooms",
    icon: BedDouble,
    href: "/dashboard/user/rooms",
    roles: ["admin", "moderator", "user"],
  },
  {
    name: "Profile",
    icon: Users,
    href: "/dashboard/user/profile",
    roles: ["admin", "moderator", "user"],
  },
  {
    name: "Wishlist",
    icon: Heart,
    href: "/dashboard/user/wishlist",
    roles: ["admin", "moderator", "user"],
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    roles: ["admin", "moderator", "user"],
  },
  {
    name: "Communication",
    icon: MessageCircle,
    href: "/dashboard/user/communication",
    roles: ["admin", "moderator", "user"],
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useSession();
  const userRole = data?.user?.role || "user";

  const filteredMenu = menuItems.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <>
      {/* Mobile Topbar */}
      <div className="md:hidden sticky top-0 bg-base-300 dark:bg-gray-900 border-b dark:border-gray-700 shadow-sm z-40 flex justify-between items-center h-16 px-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {isOpen ? <X size={24} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className={cn(
          "fixed md:sticky top-0 left-0 h-full bg-base-300 dark:bg-gray-900 border-r dark:border-gray-700 shadow-xl flex flex-col transition-all duration-300 z-50",
          isHover ? "w-64" : "w-20",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:shadow-none"
        )}
      >
        {/* Logo / Title */}
        <div className="h-16 flex items-center justify-center border-b dark:border-gray-700">
          <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
            {isHover ? "TourMS" : "T"}
          </h2>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2">
          {filteredMenu.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-150 group focus:outline-none focus:ring-2 focus:ring-blue-300",
                  isActive
                    ? "bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700"
                    : "dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 shrink-0 transition-all duration-150",
                    isActive ? "text-white" : "text-gray-500 dark:text-gray-400"
                  )}
                />
                <span
                  className={cn(
                    "transition-all duration-200 whitespace-nowrap",
                    isHover
                      ? "opacity-100 ml-1"
                      : "opacity-0 w-0 overflow-hidden"
                  )}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Logout & Back Button */}
        <div className="border-t dark:border-gray-700 p-4 flex flex-col gap-2">
          {/* Logout Button */}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 px-3 py-2 w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition font-medium"
          >
            <LogOut className="h-5 w-5" />
            {isHover && <span>Sign Out</span>}
          </button>

          {/* Back to Home Button */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 px-3 py-2 w-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            {isHover && <span>Back</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
