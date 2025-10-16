
"use client";

import Link from "next/link";
import Image from "next/image";
// Import your local image
import logoImage from "@/assesets/tour.png";

export default function LinkLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <Image
        src={logoImage} // Use the imported image
        alt="SixTour Logo"
        width={120}
        height={40}
        className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
        priority // Optional: if this is above the fold
      />
      <span className="text-2xl font-bold dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        SixTour
      </span>
    </Link>
  );
}