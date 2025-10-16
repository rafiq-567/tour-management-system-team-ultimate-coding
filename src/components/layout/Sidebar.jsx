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
  Ticket,
} from "lucide-react";
import { useSession } from "next-auth/react";

// Helper function for conditional class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- 1. Menu Definitions with Role-Based Access Control (RBAC) ---
// Each item now has a 'roles' array defining who can see it.
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
    icon: PlaneIcon,
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

  // All Users (User, Moderator, Admin)
  {
    name: "My Bookings",
    icon: Calendar,
    href: "/dashboard/user/bookings",
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
];

// --- 2. Sidebar Component (Handles Navigation and Filtering) ---
function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname(); // ✅ Correct way to get current path
  const {data} = useSession();

  // Filter menu items based on the user's role
  const filteredMenuItems = menuItems.filter(item => item.roles.includes(data?.user?.role));

  return (
    <>
      {/* Mobile Topbar & Menu Button */}
      <div className="md:hidden sticky top-0 bg-base-300 dark:bg-gray-900 border-b dark:border-gray-700 shadow-sm z-40 p-4 flex justify-between items-center h-16">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 dark:text-gray-300"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={cn(
          "fixed md:sticky top-0 left-0 h-full w-64 bg-base-300 dark:bg-gray-900 border-r dark:border-gray-700 shadow-xl flex flex-col transform transition-transform duration-300 z-50",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:shadow-none" // Sidebar is sticky and always visible on desktop
        )}
      >
        {/* Logo (Desktop View) */}
        <div className="h-16 hidden md:flex items-center justify-center border-b dark:border-gray-700 font-extrabold text-2xl text-blue-600 dark:text-blue-400">
          TourMS
        </div>

        {/* Menu Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {filteredMenuItems.map((item) => {
            // Check if the current path starts with the item's href for active state
            const isActive = currentPath.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-150",
                  "focus:outline-none focus:ring-2 focus:ring-blue-300",
                  isActive
                    ? "bg-blue-600 text-white shadow-md font-semibold hover:bg-blue-700"
                    :"dark:text-gray-300 hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800"
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
          <button className="flex items-center gap-3 px-3 py-2 w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition font-medium">
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
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

export default Sidebar;
