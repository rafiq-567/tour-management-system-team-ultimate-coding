"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const currentPath = usePathname();
  const router = useRouter();

  const userRole = session?.user?.role; // Must exist in session

  // Role-based allowed paths
  // const rolePaths = {
  //   admin: "/dashboard/admin",
  //   user: "/dashboard/user",
  //   moderator: "/dashboard/moderator",
  // };

  // Redirect to login if not authenticated
  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/login");
  //   }
  // }, [status, router]);

  // Redirect to correct dashboard if path doesn't match role
  // useEffect(() => {
  //   if (userRole && !currentPath.includes(rolePaths[userRole])) {
  //     router.push(rolePaths[userRole]);
  //   }
  // }, [currentPath, userRole, router]);


  useEffect(() => {
  const localTheme = localStorage.getItem("theme");
  document.querySelector("html").setAttribute("data-theme", localTheme);
}, [])

  if (!session || !userRole) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-xl font-bold text-gray-500">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-base-100 dark:bg-gray-950">
      {!currentPath.includes("/communication") && <Sidebar role={userRole} />}
      <div className="flex-1 flex flex-col w-full md:w-[calc(100%-16rem)]">
        <header className="hidden md:flex h-16 items-center justify-between px-8 bg-base-300 dark:bg-gray-900 border-b dark:border-gray-800 shadow-sm sticky top-0 z-30">
          <h1 className="text-xl font-extrabold dark:text-gray-100 capitalize">
            {userRole} Portal
          </h1>
          <div className="text-sm dark:text-gray-400">
            Welcome, {session.user.name || userRole}!
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
