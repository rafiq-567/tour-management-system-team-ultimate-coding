"use client";

import { useSession } from "next-auth/react";
import SmartBudgetTour from "../components/tours/SmartBudgetTour";
// import SmartBudgetTour from "@/components/tours/SmartBudgetTour";

export default function SmartBudgetPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-center text-gray-500">Loading session...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">
        🧠 Smart Budget Tour Planner
      </h1>
      <SmartBudgetTour user={session?.user} />
    </div>
  );
}
