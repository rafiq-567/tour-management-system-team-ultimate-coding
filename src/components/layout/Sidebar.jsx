"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
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
  PlaneIcon,
} from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const menuItems = [
  { name: "Dashboard", icon: Home, href: "/dashboard/admin" },
  { name: "Users", icon: Users, href: "/dashboard/admin/users" },
  { name: "Tours", icon: Plane, href: "/dashboard/admin/add/tours" },
  { name: "All Tours", icon: PlaneIcon, href: "/dashboard/admin/all" },
  { name: "Discounts", icon: CreditCard, href: "/dashboard/admin/discounts" },
  { name: "Bookings", icon: Calendar, href: "/dashboard/moderator/bookings" },
  { name: "Payments", icon: CreditCard, href: "/dashboard/admin/payments" },
  { name: "Analytics", icon: BarChart3, href: "/dashboard/admin/analytics" },
  { name: "Settings", icon: Settings, href: "/dashboard/admin/settings" },
  { name: "Profile", icon: Users, href: "/dashboard/user/profile" },
  { name: "My Bookings", icon: Calendar, href: "/dashboard/user/bookings" },
  { name: "Wishlist", icon: Heart, href: "/dashboard/user/wishlist" },
  { name: "Support", icon: Settings, href: "/dashboard/user/support" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname();

  return (
    <>
      {/* Mobile Topbar */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
       
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-700 dark:text-gray-300"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:relative top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-700 shadow-xl flex flex-col transform transition-transform duration-300 z-50",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b dark:border-gray-700 font-extrabold text-2xl text-blue-600 dark:text-blue-400">
          TourMS
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {menuItems.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-150",
                  "focus:outline-none focus:ring-2 focus:ring-blue-300",
                  isActive
                    ? "bg-blue-600 text-white shadow-lg font-semibold hover:bg-blue-700"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
                onClick={() => setIsOpen(false)}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5",
                    isActive ? "text-white" : "text-gray-500 dark:text-gray-400"
                  )}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="border-t dark:border-gray-700 p-4">
          <button className="flex items-center gap-3 px-3 py-2 w-full text-red-500 hover:bg-red-50 dark:hover:bg-gray-800 rounded-xl transition font-medium">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
