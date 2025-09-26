// app/dashboard/admin/layout.jsx
"use client";

import Sidebar from "@/components/layout/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 border-b bg-white flex items-center justify-end px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <span className="text-sm text-blue-500">Welcome, Admin</span>
            <img
              src="https://placehold.co/40x40"
              alt="avatar"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
