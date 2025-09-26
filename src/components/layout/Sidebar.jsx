// src/components/layout/Sidebar.jsx
"use client";

import { useState } from "react";
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
} from "lucide-react";
import Link from "next/link";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const menuItems = [
  { name: "Dashboard", icon: Home, href: "/dashboard/admin" },
  { name: "Users", icon: Users, href: "/dashboard/admin/users" },
  { name: "Add-Tourpackeg", icon: Plane, href: "/dashboard/admin/tourpackegform"},
  { name: "Bookings", icon: Calendar, href: "/dashboard/admin/bookings" },
  { name: "Payments", icon: CreditCard, href: "/dashboard/admin/payments" },
  { name: "Analytics", icon: BarChart3, href: "/dashboard/admin/analytics" },
  { name: "Settings", icon: Settings, href: "/dashboard/admin/settings" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Mobile Navbar with toggle button */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white border-b shadow-sm h-full">
        <div className="font-bold text-xl">TourMS</div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md focus:outline-none focus:ring"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:relative top-0 left-0 h-full w-64 bg-white border-r shadow-md flex flex-col transform transition-transform duration-300 z-50 ",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b font-bold text-xl text-blue-500">
          TourMS
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              onClick={() => setIsOpen(false)} // auto close on mobile
            >
              <item.icon className="h-5 w-5 text-gray-500" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Footer actions */}
        <div className="border-t p-4">
          <button className="flex items-center gap-3 px-3 py-2 w-full text-red-500 hover:bg-red-50 rounded-lg transition">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}