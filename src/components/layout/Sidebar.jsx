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
  Package2,
  Handshake,
  LifeBuoy,   // 🆕 For user support
  Headphones, // 🆕 For admin support management
} from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const menuItems = [
  // Admin & Moderator
  { name: "Dashboard", icon: Home, href: "/dashboard/admin", roles: ["admin", "moderator"] },
  { name: "All Tours", icon: PlaneIcon, href: "/dashboard/admin/all", roles: ["admin", "moderator"] },
  { name: "Bookings", icon: Calendar, href: "/dashboard/moderator/bookings", roles: ["admin", "moderator"] },
  { name: "Payments", icon: CreditCard, href: "/dashboard/payments", roles: ["admin", "moderator"] },

  // Admin Only
  { name: "Add Tour", icon: Plane, href: "/dashboard/admin/add-tour", roles: ["admin"] },
  { name: "Discounts", icon: Ticket, href: "/dashboard/admin/discounts", roles: ["admin"] },
  { name: "Users Management", icon: Users, href: "/dashboard/admin/users", roles: ["admin"] },
  { name: "Analytics", icon: BarChart3, href: "/dashboard/admin/analytics", roles: ["admin"] },

  // 🆕 Admin Support Management
  { name: "Support Management", icon: Headphones, href: "/dashboard/admin/support", roles: ["admin"] },

  // ✅ User Features
  { name: "Travel Buddy", icon: Handshake, href: "/dashboard/user/travel-buddy", roles: ["admin", "moderator", "user"] },
  { name: "My Bookings", icon: Calendar, href: "/dashboard/user/bookings", roles: ["admin", "moderator", "user"] },
  { name: "Wishlist", icon: Heart, href: "/dashboard/user/wishlist", roles: ["admin", "moderator", "user"] },
  { name: "Profile", icon: Users, href: "/dashboard/user/profile", roles: ["admin", "moderator", "user"] },

  // 🆕 Add Support for all roles
  { name: "Support", icon: LifeBuoy, href: "/dashboard/support", roles: ["admin", "moderator", "user"] },

  { name: "Settings", icon: Settings, href: "/dashboard/settings", roles: ["admin", "moderator", "user"] },
];

function Sidebar({ role }) {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname();

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(role));

  return (
    <>
      {/* Mobile Topbar */}
      <div className="md:hidden sticky top-0 bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-sm z-40 p-4 flex justify-between items-center h-16">
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
          "fixed md:sticky top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-700 shadow-xl flex flex-col transform transition-transform duration-300 z-50",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:shadow-none"
        )}
      >
        <div className="h-16 hidden md:flex items-center justify-center border-b dark:border-gray-700 font-extrabold text-2xl text-blue-600 dark:text-blue-400">
          TourMS
        </div>

        {/* Menu Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {filteredMenuItems.map((item) => {
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
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                )}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-gray-500 dark:text-gray-400")} />
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

