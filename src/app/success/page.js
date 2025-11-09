

import { Suspense } from "react"; 
import SuccessContent from "./SuccessContent";


// Keep this to force dynamic rendering and prevent build-time optimization
export const dynamic = "force-dynamic";

// This file is now a pure Server Component wrapper (no "use client")
export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-green-50">
        <p className="text-xl font-semibold text-gray-700">Loading payment details...</p>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}
