"use client";
import React, { useState, useEffect } from "react";
import { Zap, Loader2 } from "lucide-react";

// InlineAlert component
const InlineAlert = ({ message, type, onClose }) => {
  if (!message) return null;

  const baseClasses =
    "fixed top-4 right-4 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3";
  let style = {};
  if (type === "success") style = { backgroundColor: "#4CAF50", color: "white" };
  if (type === "error") style = { backgroundColor: "#F44336", color: "white" };

  return (
    <div className={baseClasses} style={style}>
      <span className="font-semibold">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-80 hover:opacity-100">X</button>
    </div>
  );
};

// DiscountCard component
const DiscountCard = ({ discount }) => (
  <div className="p-6 bg-base-300 dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
    <h3 className="text-xl font-bold mb-2 dark:text-gray-100">{discount.code}</h3>
    <p className="dark:text-gray-300 mb-2">{discount.description}</p>
    <div className="text-lg font-semibold text-green-600 dark:text-green-400">
      {discount.discountType === "percentage" ? `${discount.value}%` : `$${discount.value}`}
    </div>
    <p className="text-sm dark:text-gray-400 mt-2">
      Valid: {new Date(discount.validFrom).toLocaleDateString()} - {new Date(discount.validTo).toLocaleDateString()}
    </p>
  </div>
);

export default function Discounts() {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchDiscounts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/discounts");
        const data = await res.json();
        if (res.ok) {
          // Filter only active discounts
          setDiscounts(data.discounts?.filter(d => d.status === "active") || []);
        } else {
          setAlert({ message: data.error || "Failed to fetch discounts", type: "error" });
        }
      } catch (err) {
        console.error(err);
        setAlert({ message: "Failed to fetch discounts", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchDiscounts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center py-12 dark:bg-gray-900">
        <Loader2 className="animate-spin text-blue-600 h-6 w-6" />
        <p className="ml-3 text-gray-600 dark:text-gray-300">Loading today's deals...</p>
      </div>
    );

  if (discounts.length === 0)
    return (
      <div className="py-12 text-center bg-gray-50 dark:bg-gray-900">
        <p className="mt-2 text-lg font-semibold text-gray-700 dark:text-gray-300">No active promotions right now.</p>
      </div>
    );

  return (
    <div className="bg-base-100 dark:bg-gray-900 sm:p-8">
      <InlineAlert message={alert?.message} type={alert?.type} onClose={() => setAlert(null)} />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-2">
          <h2 className="text-4xl font-extrabold dark:text-gray-100 flex items-center justify-center">
            <Zap className="h-8 w-8 text-red-500 mr-3" />
            Today's Best Deals
          </h2>
          <p className="mt-3 text-xl dark:text-gray-400">
            Use these exclusive codes on checkout to save big on your next adventure!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {discounts.map(discount => (
            <DiscountCard key={discount._id} discount={discount} />
          ))}
        </div>
      </div>
    </div>
  );
}
