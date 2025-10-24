"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }) {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUserRole(data.role || "user"); // default fallback
      } catch (err) {
        console.error("Error fetching user role:", err);
        setUserRole("guest"); // fallback if no session found
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  // 🌀 Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-base-100 dark:bg-gray-950">
        <p className="text-lg text-gray-500 animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );
  }

  // 🚫 Optional: Restrict guests
  if (userRole === "guest") {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
        <p className="text-gray-500 mt-2">
          You must log in to access the dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-base-100 dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar role={userRole} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full md:w-[calc(100%-16rem)]">
        {/* Header */}
        <header className="hidden md:flex h-16 items-center justify-between px-8 bg-base-300 dark:bg-gray-900 border-b dark:border-gray-800 shadow-sm sticky top-0 z-30">
          <h1 className="text-xl font-extrabold dark:text-gray-100 capitalize">
            {userRole} Portal
          </h1>
          <div className="text-sm dark:text-gray-400">Welcome, {userRole}!</div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
