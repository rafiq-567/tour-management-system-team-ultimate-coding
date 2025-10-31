
// "use client";

// import { useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { usePathname, useRouter } from "next/navigation";
// import Sidebar from "@/components/layout/Sidebar";

// // 🔹 Sidebar route-role mapping
// const menuItems = [
//   { href: "/dashboard/user", roles: ["admin", "moderator", "user"] },
//   { href: "/dashboard/user/wishlist", roles: ["admin", "moderator", "user"] },
//   { href: "/dashboard/admin", roles: ["admin"] },
//   { href: "/dashboard/moderator", roles: ["admin", "moderator"] }, // ✅ admin can access moderator pages
//   { href: "/dashboard/moderator/bookings", roles: ["admin", "moderator"] }, // ✅ allow both
//   { href: "/dashboard/settings", roles: ["admin", "moderator", "user"] },
//   { href: "/dashboard/communication", roles: ["admin", "moderator", "user"] },
// ];

// export default function DashboardLayout({ children }) {
//   const { data: session, status } = useSession();
//   const currentPath = usePathname();
//   const router = useRouter();

//   const userRole = session?.user?.role;

//   // 🔹 Redirect to login if unauthenticated
//   useEffect(() => {
//     if (status === "unauthenticated") router.push("/login");
//   }, [status, router]);

//   // 🔹 Handle permissions + redirect logic
//   useEffect(() => {
//     if (!userRole || !currentPath) return;

//     // ✅ Admin can access everything
//     if (userRole === "admin") return;

//     // ✅ Non-admin users need permission checks
//     const allowed = menuItems.some(
//       (item) =>
//         currentPath.startsWith(item.href) && item.roles.includes(userRole)
//     );

//     if (!allowed) {
//       const defaultPath =
//         userRole === "moderator"
//           ? "/dashboard/moderator"
//           : "/dashboard/user";
//       router.push(defaultPath);
//     }
//   }, [currentPath, userRole, router]);

//   if (!session || !userRole) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <h1 className="text-xl font-bold text-gray-500">Loading...</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-base-100 dark:bg-gray-950">
//       {/* 🔹 Hide sidebar on special pages */}
//       {!currentPath.includes("/communication") && <Sidebar role={userRole} />}

//       <div className="flex-1 flex flex-col w-full md:w-[calc(100%-16rem)]">
//         <header className="hidden md:flex h-16 items-center justify-between px-8 bg-base-300 dark:bg-gray-900 border-b dark:border-gray-800 shadow-sm sticky top-0 z-30">
//           <h1 className="text-xl font-extrabold dark:text-gray-100 capitalize">
//             {userRole} Portal
//           </h1>
//           <div className="text-sm dark:text-gray-400">
//             Welcome, {session.user.name || userRole}!
//           </div>
//         </header>

//         <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";

// 🔹 Sidebar route-role mapping
const menuItems = [
  { href: "/dashboard/user", roles: ["admin", "moderator", "user"] },
  { href: "/dashboard/user/wishlist", roles: ["admin", "moderator", "user"] },
  { href: "/dashboard/admin", roles: ["admin"] },
  { href: "/dashboard/moderator", roles: ["admin", "moderator"] }, // ✅ admin can access moderator pages
  { href: "/dashboard/moderator/bookings", roles: ["admin", "moderator"] }, // ✅ allow both
  { href: "/dashboard/settings", roles: ["admin", "moderator", "user"] },
  { href: "/dashboard/communication", roles: ["admin", "moderator", "user"] },
  { href: "/dashboard/support", roles: ["admin", "moderator", "user"] }, // ✅ NEW — everyone can access Support
];

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const currentPath = usePathname();
  const router = useRouter();

  const userRole = session?.user?.role;

  // 🔹 Redirect to login if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  // 🔹 Handle permissions + redirect logic
  useEffect(() => {
    if (!userRole || !currentPath) return;

    // ✅ Admin can access everything
    if (userRole === "admin") return;

    // ✅ Non-admin users need permission checks
    const allowed = menuItems.some(
      (item) =>
        currentPath.startsWith(item.href) && item.roles.includes(userRole)
    );

    if (!allowed) {
      const defaultPath =
        userRole === "moderator"
          ? "/dashboard/moderator"
          : "/dashboard/user";
      router.push(defaultPath);
    }
  }, [currentPath, userRole, router]);

  if (!session || !userRole) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-xl font-bold text-gray-500">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-base-100 dark:bg-gray-950">
      {/* 🔹 Hide sidebar on special pages */}
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
