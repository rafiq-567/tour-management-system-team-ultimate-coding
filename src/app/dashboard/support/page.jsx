
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import NewTicketForm from "../user/support/components/NewTicketForm";
import AdminReplyForm from "./components/AdminReplyForm";
// import AdminReplyForm from "./components/AdminReplyForm";

export default function SupportPage() {
  const { data: session } = useSession();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const userRole = session?.user?.role;
  const userId = session?.user?.id || session?.user?._id;

  const fetchTickets = async () => {
    if (!session) return;
    setLoading(true);
    try {
      let url = "/api/support";
      if (userRole !== "admin" && userRole !== "moderator") {
        url += `?userId=${userId}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        setTickets(data.tickets);
      }
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [session]);

  if (loading) return <p className="text-center p-6">Loading tickets...</p>;

  return (
    <div className="p-6 space-y-6">
      {/* ✅ Only users can submit tickets */}
      {userRole !== "admin" && userRole !== "moderator" && <NewTicketForm />}

      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        {userRole === "admin" || userRole === "moderator"
          ? "All Support Tickets"
          : "My Support Tickets"}
      </h2>

      {tickets.length === 0 ? (
        <p className="text-gray-500 text-center">No tickets found.</p>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md divide-y divide-gray-200 dark:divide-gray-700">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                {ticket.subject}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {ticket.message}
              </p>

              <p className="text-xs mt-2">
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded ${
                    ticket.status === "Open"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {ticket.status}
                </span>
              </p>

              {ticket.adminReply && (
                <p className="text-sm text-blue-600 mt-2">
                  💬 Admin Reply: {ticket.adminReply}
                </p>
              )}

              {/* ✅ Admin/Moderator Reply Form */}
              {(userRole === "admin" || userRole === "moderator") && (
                <AdminReplyForm
                  ticketId={ticket._id}
                  refreshTickets={fetchTickets}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
