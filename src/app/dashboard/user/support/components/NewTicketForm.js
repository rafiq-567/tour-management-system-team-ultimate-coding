"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";

const NewTicketForm = () => {
  const { data: session } = useSession();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user) {
      setError("You must be logged in to submit a ticket.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          name: session.user.name,
          email: session.user.email,
          subject,
          message: description,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit ticket");
      }

      setSubject("");
      setDescription("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-base-300 dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
        Submit a New Support Ticket 📝
      </h2>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Can’t find an answer in the Help Center? Submit a ticket and our team will respond quickly.
      </p>

      {success && (
        <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
          ✅ Ticket submitted successfully! Check your ticket history for updates.
        </div>
      )}

      {error && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border dark:bg-gray-800 dark:text-gray-200"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border dark:bg-gray-800 dark:text-gray-200"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70"
        >
          {loading ? "Submitting..." : "Submit Ticket"}
        </button>
      </form>
    </div>
  );
};

export default NewTicketForm;
