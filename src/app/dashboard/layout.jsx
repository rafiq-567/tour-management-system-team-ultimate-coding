"use client";

import Sidebar from "@/components/layout/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar (optional add here) */}
        <header className="hidden md:flex h-16 items-center justify-between px-6 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
          <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200">
            Admin Dashboard
          </h1>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
