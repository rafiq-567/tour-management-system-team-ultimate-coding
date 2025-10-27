"use client";

import Link from "next/link";
import Image from "next/image";
// Import your local image

export default function LinkLogo() {
  return (
    <Link href="/">
      <div className="flex items-center space-x-2  p-2 hover:bg-accent/20 transition duration-200 ease-in-out cursor-pointer overflow-hidden">
        <Image
          src="https://i.ibb.co.com/TMrScv8t/Screenshot-2025-09-27-074922.png"
          alt="Logo"
          width={40}
          height={10}
          className="rounded-full"
        />
        <div className="text-lg font-bold">SixTour</div>
      </div>
    </Link>
  );
}
