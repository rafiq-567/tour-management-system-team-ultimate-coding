"use client";
import { useMemo } from "react";

export default function TourStats({ tours }) {
  // Ensure tours is always an array
  const safeTours = Array.isArray(tours) ? tours : [];
  const stats = useMemo(() => {
    const totalTours = safeTours.length;
    const totalPrice = safeTours.reduce((sum, t) => sum + (t.price || 0), 0);
    const avgPrice = totalTours > 0 ? (totalPrice / totalTours).toFixed(2) : 0;

    const totalActivities = tours.reduce(
      (sum, t) => sum + (t.activities ? t.activities.length : 0),
      0
    );

    return { totalTours, avgPrice, totalActivities };
  }, [tours]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      <div className="bg-white shadow rounded-xl p-6 hover:bg-blue-200 duration-500">
        <h3 className="text-xl font-medium text-green-500">Total Tours</h3>
        <p className="mt-2 text-2xl font-semibold text-gray-900">
          {stats.totalTours}
        </p>
      </div>

      <div className="bg-white shadow rounded-xl p-6 hover:bg-blue-200 duration-500">
        <h3 className="text-xl font-medium text-green-500">Average Price</h3>
        <p className="mt-2 text-2xl font-semibold text-gray-900">
          {stats.avgPrice}
        </p>
      </div>

      <div className="bg-white shadow rounded-xl p-6 hover:bg-blue-200 duration-500">
        <h3 className="text-xl font-medium text-green-500">Total Activities</h3>
        <p className="mt-2 text-2xl font-semibold text-gray-900">
          {stats.totalActivities}
        </p>
      </div>
    </div>
  );
}
