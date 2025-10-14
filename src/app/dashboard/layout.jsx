"use client";

import Sidebar from "@/components/layout/Sidebar";


export default function DashboardLayout({ children }) {
  // 🚨 TODO: Replace this with actual role retrieval (e.g., from session, Context, or JWT)
  const userRole = "admin"; // 🔄 dynamic later: "admin" | "moderator" | "user"

  return (
    <div className="flex min-h-screen bg-base-100 dark:bg-gray-950">
      {/* Sidebar: Fixed width, handles responsiveness and role filtering */}
      <Sidebar role={userRole} />

      {/* Main content Area */}
      <div className="flex-1 flex flex-col w-full md:w-[calc(100%-16rem)]">
        {/* Header (Desktop Only) */}
        <header className="hidden md:flex h-16 items-center justify-between px-8 bg-white dark:bg-gray-900 border-b dark:border-gray-800 shadow-sm sticky top-0 z-30">
          <h1 className="text-xl font-extrabold text-gray-800 dark:text-gray-100 capitalize">
            {userRole} Portal
          </h1>
          {/* Future search/notifications here */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Welcome, {userRole}!
          </div>
        </header>

        {/* Dashboard Content Area */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
