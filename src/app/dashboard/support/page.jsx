// "use client";
// import { useState, useEffect } from "react";

// export default function SupportPage() {
//     const [form, setForm] = useState({ subject: "", message: "" });
//     const [tickets, setTickets] = useState([]);

//     // Example logged-in user (replace with real auth user data)
//     const user = { id: "u001", name: "John Doe", email: "john@example.com" };

//     // Load existing tickets
//     useEffect(() => {
//         fetch(`/api/support?userId=${user.id}`)
//             .then((res) => res.json())
//             .then((data) => setTickets(data.tickets || []));
//     }, []);

//     // Handle new ticket submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const res = await fetch("/api/support", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 userId: user.id,
//                 name: user.name,
//                 email: user.email,
//                 subject: form.subject,
//                 message: form.message,
//             }),
//         });

//         const data = await res.json();
//         if (data.success) {
//             alert("Support ticket submitted!");
//             setTickets([data.ticket, ...tickets]);
//             setForm({ subject: "", message: "" });
//         } else {
//             alert("Error: " + data.message);
//         }
//     };

//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold mb-4">Support Center</h1>

//             {/* Submit New Ticket */}
//             <form
//                 onSubmit={handleSubmit}
//                 className="bg-white p-4 rounded-lg shadow mb-6"
//             >
//                 <input
//                     type="text"
//                     placeholder="Subject"
//                     value={form.subject}
//                     onChange={(e) => setForm({ ...form, subject: e.target.value })}
//                     className="w-full border p-2 rounded mb-3"
//                     required
//                 />
//                 <textarea
//                     placeholder="Describe your issue"
//                     value={form.message}
//                     onChange={(e) => setForm({ ...form, message: e.target.value })}
//                     className="w-full border p-2 rounded mb-3"
//                     required
//                 />
//                 <button
//                     type="submit"
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                     Submit Ticket
//                 </button>
//             </form>

//             {/* Display Tickets */}
//             <div>
//                 <h2 className="text-xl font-semibold mb-2">My Support Tickets</h2>
//                 {tickets.length === 0 ? (
//                     <p className="text-gray-500">No tickets yet.</p>
//                 ) : (
//                     <ul className="space-y-3">
//                         {tickets.map((t, i) => (
//                             <li key={i} className="border p-3 rounded bg-gray-50">
//                                 <p className="font-semibold">{t.subject}</p>
//                                 <p className="text-gray-700">{t.message}</p>
//                                 <p className="text-sm mt-1">
//                                     <strong>Status:</strong> {t.status}
//                                 </p>
//                                 {t.adminReply && (
//                                     <p className="mt-2 text-green-700">
//                                         <strong>Admin Reply:</strong> {t.adminReply}
//                                     </p>
//                                 )}
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//         </div>
//     );
// }

"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function SupportPage() {
    const { data: session, status } = useSession();
    const [form, setForm] = useState({ subject: "", message: "" });
    const [tickets, setTickets] = useState([]);

    // If still loading session
    if (status === "loading") {
        return <p>Loading...</p>;
    }

    // If not logged in
    if (!session) {
        return <p>Please log in to view or submit support tickets.</p>;
    }

    const user = session.user; // ✅ { id, name, email, role }

    // Load existing tickets
    useEffect(() => {
        fetch(`/api/support?userId=${user.id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched support data:", data);
                setTickets(data.tickets || []);
            })
            .catch((err) => console.error("Error loading tickets:", err));
    }, [user.id]);


    // Handle new ticket submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/support", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: user.id,
                name: user.name,
                email: user.email,
                subject: form.subject,
                message: form.message,
            }),
        });

        const data = await res.json();
        if (data.success) {
            alert("Support ticket submitted!");
            setTickets([data.ticket, ...tickets]);
            setForm({ subject: "", message: "" });
        } else {
            alert("Error: " + data.message);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Support Center</h1>

            {/* Submit New Ticket */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-4 rounded-lg shadow mb-6"
            >
                <input
                    type="text"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full border p-2 rounded mb-3"
                    required
                />
                <textarea
                    placeholder="Describe your issue"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border p-2 rounded mb-3"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Submit Ticket
                </button>
            </form>

            {/* Display Tickets */}
            <div>
                <h2 className="text-xl font-semibold mb-2">My Support Tickets</h2>
                {tickets.length === 0 ? (
                    <p className="text-gray-500">No tickets yet.</p>
                ) : (
                    <ul className="space-y-3">
                        {tickets.map((t, i) => (
                            <li key={i} className="border p-3 rounded bg-gray-50">
                                <p className="font-semibold">{t.subject}</p>
                                <p className="text-gray-700">{t.message}</p>
                                <p className="text-sm mt-1">
                                    <strong>Status:</strong> {t.status}
                                </p>
                                {t.adminReply && (
                                    <p className="mt-2 text-green-700">
                                        <strong>Admin Reply:</strong> {t.adminReply}
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
