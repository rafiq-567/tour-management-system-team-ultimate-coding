"use client";

import Link from "next/link";

export default function LinkLogo() {
  return (
    <Link href="/" className="flex items-center ">
      <img
        src="https://i.ibb.co/TMrScv8/Screenshot-2025-09-27-074922.png"
        alt="SixTour Logo"
        className="h-8 w-auto"
      />

      <span className="text-lg font-bold">SixTour</span>
    </Link>
  );
}
