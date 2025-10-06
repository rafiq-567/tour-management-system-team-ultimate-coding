"use client";

import Link from "next/link";
import Image from "next/image";

export default function LinkLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <Image
        src="https://i.ibb.co/TMrScv8/Screenshot-2025-09-27-074922.png"
        alt="SixTour Logo"
        width={120}
        height={40}
        className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
      />
      <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        SixTour
      </span>
    </Link>
  );
}
