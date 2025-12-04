"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/layout/Sidebar";
import LinkLogo from "@/components/userClick/LinkLogo";

export default function DashboardLayout({ children }) {
  const { data: session } = useSession();
  const userRole = session?.user?.role; // Must exist in sessio



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
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">

        {/* Navbar */}
        <div className="navbar bg-base-300 w-full  lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">DashBoard</div>
        </div>
        {/* Page content here */}
        {children}
        {/* Page content here */}
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-300 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          {/* <ProFastLogo></ProFastLogo> */}
          <li>
            <LinkLogo />
          </li>
          {<Sidebar></Sidebar>}

        </ul>
      </div>
    </div>
  );
}