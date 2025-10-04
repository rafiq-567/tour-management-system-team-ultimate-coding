"use client";

import React, { useEffect, useState } from "react";
import { Check, X, Loader2, Clock, CheckCircle, XCircle, Calendar, Users, Plane, DollarSign } from "lucide-react";

// --- Helper Components ---
const InlineAlert = ({ message, type, onClose }) => {
  if (!message) return null;
  let bg = "bg-gray-500", Icon = Clock;
  if (type === "success") { bg = "bg-green-600"; Icon = CheckCircle; }
  if (type === "error") { bg = "bg-red-600"; Icon = XCircle; }

  return (
    <div className={`${bg} fixed top-4 right-4 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 z-50`}>
      <Icon size={18} /> <span>{message}</span>
      <button onClick={onClose}><X size={14} /></button>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  let color = "bg-yellow-100 text-yellow-700", Icon = Clock;
  if (status === "approved") { color = "bg-green-100 text-green-700"; Icon = Check; }
  if (status === "rejected") { color = "bg-red-100 text-red-700"; Icon = X; }
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${color}`}>
      <Icon size={14} /> {status.toUpperCase()}
    </span>
  );
};

// --- Main Component ---
export default function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      if (res.ok) setBookings(data);
      else throw new Error(data.error || "Failed to fetch bookings");
    } catch (err) {
      console.error(err);
      setAlert({ message: "Could not fetch bookings.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status } : b))
        );
        setAlert({ message: `Booking ${status}`, type: "success" });
      } else throw new Error(data.error);
    } catch (err) {
      setAlert({ message: "Update failed", type: "error" });
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <InlineAlert message={alert?.message} type={alert?.type} onClose={() => setAlert(null)} />

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">Booking Approval Center</h1>
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-6 flex items-center justify-center gap-3">
              <Loader2 className="animate-spin text-blue-600" /> Loading bookings...
            </div>
          ) : bookings.length === 0 ? (
            <p className="p-10 text-center text-gray-500">No bookings found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"><Plane size={16} className="inline mr-1" /> Tour</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"><Users size={16} className="inline mr-1" /> User</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider"><DollarSign size={16} className="inline mr-1" /> Amount</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider"><Calendar size={16} className="inline mr-1" /> Date</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {bookings.map((b) => (
                    <tr key={b._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4">{b.tourTitle}</td>
                      <td className="px-6 py-4">{b.name}</td>
                      <td className="px-6 py-4 text-center">${b.amount}</td>
                      <td className="px-6 py-4 text-center">{new Date(b.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-center"><StatusBadge status={b.status} /></td>
                      <td className="px-6 py-4 text-center">
                        {b.status === "pending" ? (
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleStatusChange(b._id, "approved")}
                              disabled={updatingId === b._id}
                              className="bg-green-600 text-white px-3 py-1 rounded-lg"
                            >
                              {updatingId === b._id ? <Loader2 className="animate-spin h-4 w-4" /> : "Approve"}
                            </button>
                            <button
                              onClick={() => handleStatusChange(b._id, "rejected")}
                              disabled={updatingId === b._id}
                              className="bg-red-600 text-white px-3 py-1 rounded-lg"
                            >
                              {updatingId === b._id ? <Loader2 className="animate-spin h-4 w-4" /> : "Reject"}
                            </button>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">Action Done</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
