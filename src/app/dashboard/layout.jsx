
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
        

        {/* Dashboard Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
