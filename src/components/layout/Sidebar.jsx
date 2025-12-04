"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession,signOut } from "next-auth/react";
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
  Package2,
  Handshake,
  LifeBuoy,   // 🆕 For user support
  Headphones, // 🆕 For admin support management
  BedDouble,
  MessageCircle,
  ArrowLeft,
  PlaneIcon,
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
    href: "/dashboard/admin/add/tours",
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
  // {
  //   name: "Analytics",
  //   icon: BarChart3,
  //   href: "/dashboard/admin/analytics",
  //   roles: ["admin"],
  // },

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
  {
    name: "Communication",
    icon: MessageCircle,
    href: "/dashboard/user/communication",
    roles: ["admin", "moderator", "user"],
  },

  // 🆕 Admin Support Management
  { name: "Support Management", icon: Headphones, href: "/dashboard/admin/support", roles: ["admin", "moderator", "user"] },

  // ✅ User Features
  { name: "Travel Buddy", icon: Handshake, href: "/dashboard/user/travel-buddy", roles: ["admin", "moderator", "user"] },
  // { name: "My Bookings", icon: Calendar, href: "/dashboard/user/bookings", roles: ["admin", "moderator", "user"] },
  // { name: "Wishlist", icon: Heart, href: "/dashboard/user/wishlist", roles: ["admin", "moderator", "user"] },
  // { name: "Profile", icon: Users, href: "/dashboard/user/profile", roles: ["admin", "moderator", "user"] },

  // 🆕 Add Support for all roles
  { name: "Support", icon: LifeBuoy, href: "/dashboard/support", roles: ["admin", "moderator", "user"] },

  // { name: "Settings", icon: Settings, href: "/dashboard/settings", roles: ["admin", "moderator", "user"] },
];


export default function Sidebar() {
  const pathname = usePathname();
  const { data } = useSession();
  const userRole = data?.user?.role || "user";

  const filteredMenu = menuItems.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <>
      {
        filteredMenu.map(item => {
          const isActive = pathname.startsWith(item.href);
          return <Link key={item.name}
          className={`flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-200 hover:text-black text-xl ${isActive && 'bg-blue-600 text-white'}`}
          href={item.href}>
            <item.icon />
          <li>{item.name}</li>
          </Link>
        })
      }
        <button 
        onClick={() => signOut()}
        className='flex items-center gap-3 px-3 py-3 text-xl text-red-500 cursor-pointer hover:bg-gray-200 rounded-lg'>
          <LogOut />
          <li>LogOut</li>
        </button>
    </>
  );
}



