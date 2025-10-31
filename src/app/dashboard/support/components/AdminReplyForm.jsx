"use client";
import { useState } from "react";

export default function AdminReplyForm({ ticketId, refreshTickets }) {
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReply = async () => {
    if (!reply.trim()) return alert("Please enter a reply message.");

    try {
      setLoading(true);
      const res = await fetch("/api/support", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: ticketId,
          adminReply: reply,
          status: "Closed",
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Reply sent successfully!");
        setReply("");
        refreshTickets(); // ✅ reload updated tickets
      } else {
        alert(data.message || "Failed to send reply.");
      }
    } catch (err) {
      console.error("Error replying:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3 border-t border-gray-300 pt-2">
      <textarea
        className="w-full p-2 border rounded-md text-sm dark:bg-gray-900 dark:text-gray-100"
        rows="2"
        placeholder="Write a reply..."
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      ></textarea>
      <button
        onClick={handleReply}
        disabled={loading}
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm"
      >
        {loading ? "Sending..." : "Send Reply"}
      </button>
    </div>
  );
}
