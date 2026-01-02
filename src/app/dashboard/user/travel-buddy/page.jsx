// // "use client";
// // import React, { useState } from "react";

// // export default function TravelBuddyPage() {
// //   const [formData, setFormData] = useState({
// //     from: "",
// //     to: "",
// //     date: "",
// //     budget: "",
// //     notes: "",
// //   });

// //   const [search, setSearch] = useState({ from: "", to: "" });
// //   const [matches, setMatches] = useState([]);
// //   const [message, setMessage] = useState("");

// //   // ✅ Create Travel Buddy Post
// //   const handleCreate = async (e) => {
// //     e.preventDefault();
// //     setMessage("Creating your travel buddy post...");

// //     try {
// //       const res = await fetch("/api/travel-buddy/post", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(formData),
// //       });

// //       const data = await res.json();
// //       if (data.success) {
// //         setMessage("✅ Post created successfully!");
// //         setFormData({ from: "", to: "", date: "", budget: "", notes: "" });
// //       } else {
// //         setMessage("❌ Failed to create post.");
// //       }
// //     } catch (error) {
// //       setMessage("❌ Error connecting to server.");
// //     }
// //   };

// //   // 🔍 Find Matching Buddies
// //   const handleFind = async (e) => {
// //     e.preventDefault();
// //     setMessage("Searching for matching travel buddies...");

// //     try {
// //       const res = await fetch(
// //         `/api/travel-buddy/find?from=${search.from}&to=${search.to}`
// //       );
// //       const data = await res.json();
// //       if (data.success) {
// //         setMatches(data.matches);
// //         setMessage(`✅ Found ${data.matches.length} matches.`);
// //       } else {
// //         setMessage("❌ No matches found.");
// //       }
// //     } catch (error) {
// //       setMessage("❌ Error fetching data.");
// //     }
// //   };

// //   return (
// //     <div className="max-w-4xl mx-auto p-6 space-y-12">
// //       <h1 className="text-3xl font-bold text-center mb-6">
// //         🧭 Travel Buddy Dashboard
// //       </h1>

// //       {/* ✅ CREATE POST SECTION */}
// //       <section className="bg-white shadow-lg p-6 rounded-2xl">
// //         <h2 className="text-xl font-semibold mb-4">
// //           ✈️ Create a Travel Buddy Post
// //         </h2>
// //         <form onSubmit={handleCreate} className="space-y-4">
// //           <div className="grid grid-cols-2 gap-4">
// //             <input
// //               type="text"
// //               placeholder="From (e.g., Dhaka)"
// //               value={formData.from}
// //               onChange={(e) =>
// //                 setFormData({ ...formData, from: e.target.value })
// //               }
// //               className="border p-2 rounded-lg"
// //               required
// //             />
// //             <input
// //               type="text"
// //               placeholder="To (e.g., Cox’s Bazar)"
// //               value={formData.to}
// //               onChange={(e) =>
// //                 setFormData({ ...formData, to: e.target.value })
// //               }
// //               className="border p-2 rounded-lg"
// //               required
// //             />
// //           </div>
// //           <div className="grid grid-cols-2 gap-4">
// //             <input
// //               type="date"
// //               value={formData.date}
// //               onChange={(e) =>
// //                 setFormData({ ...formData, date: e.target.value })
// //               }
// //               className="border p-2 rounded-lg"
// //               required
// //             />
// //             <input
// //               type="number"
// //               placeholder="Budget (e.g., 10000)"
// //               value={formData.budget}
// //               onChange={(e) =>
// //                 setFormData({ ...formData, budget: e.target.value })
// //               }
// //               className="border p-2 rounded-lg"
// //               required
// //             />
// //           </div>
// //           <textarea
// //             placeholder="Notes (optional)"
// //             value={formData.notes}
// //             onChange={(e) =>
// //               setFormData({ ...formData, notes: e.target.value })
// //             }
// //             className="border p-2 rounded-lg w-full"
// //           />
// //           <button
// //             type="submit"
// //             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
// //           >
// //             Create Post
// //           </button>
// //         </form>
// //       </section>

// //       {/* 🔍 FIND BUDDY SECTION */}
// //       <section className="bg-white shadow-lg p-6 rounded-2xl">
// //         <h2 className="text-xl font-semibold mb-4">🔍 Find a Travel Buddy</h2>
// //         <form onSubmit={handleFind} className="space-y-4">
// //           <div className="grid grid-cols-2 gap-4">
// //             <input
// //               type="text"
// //               placeholder="From"
// //               value={search.from}
// //               onChange={(e) => setSearch({ ...search, from: e.target.value })}
// //               className="border p-2 rounded-lg"
// //             />
// //             <input
// //               type="text"
// //               placeholder="To"
// //               value={search.to}
// //               onChange={(e) => setSearch({ ...search, to: e.target.value })}
// //               className="border p-2 rounded-lg"
// //             />
// //           </div>
// //           <button
// //             type="submit"
// //             className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
// //           >
// //             Find Buddy
// //           </button>
// //         </form>

// //         {/* ✅ Display Matches */}
// //         <div className="mt-6">
// //           {matches.length > 0 ? (
// //             <div className="space-y-4">
// //               {matches.map((buddy, index) => (
// //                 <div
// //                   key={index}
// //                   className="border p-4 rounded-lg shadow-sm hover:shadow-md transition"
// //                 >
// //                   <p>
// //                     <strong>From:</strong> {buddy.from} →{" "}
// //                     <strong>To:</strong> {buddy.to}
// //                   </p>
// //                   <p>
// //                     <strong>Date:</strong>{" "}
// //                     {new Date(buddy.date).toLocaleDateString()}
// //                   </p>
// //                   <p>
// //                     <strong>Budget:</strong> {buddy.budget} ৳
// //                   </p>
// //                   {buddy.notes && <p>📝 {buddy.notes}</p>}
// //                 </div>
// //               ))}
// //             </div>
// //           ) : (
// //             <p className="text-gray-500">No matches found yet.</p>
// //           )}
// //         </div>
// //       </section>

// //       {/* Status Message */}
// //       {message && (
// //         <p className="text-center text-blue-600 font-medium">{message}</p>
// //       )}
// //     </div>
// //   );
// // }


// "use client";
// import React, { useState, useEffect } from "react";

// export default function TravelBuddyPage() {
//   const [formData, setFormData] = useState({
//     from: "",
//     to: "",
//     date: "",
//     budget: "",
//     notes: "",
//   });

//   const [search, setSearch] = useState({ from: "", to: "" });
//   const [matches, setMatches] = useState([]);
//   const [message, setMessage] = useState("");

//   // ✅ Load all travel buddies on page load
//   useEffect(() => {
//     async function loadBuddies() {
//       try {
//         const res = await fetch("/api/travel-buddy/all");
//         const data = await res.json();
//         if (data.success) {
//           setMatches(data.buddies);
//         } else {
//           console.error("Failed to load buddies:", data.error);
//         }
//       } catch (error) {
//         console.error("Error loading buddies:", error);
//       }
//     }
//     loadBuddies();
//   }, []);

//   // ✅ Create Travel Buddy Post
//   const handleCreate = async (e) => {
//     e.preventDefault();
//     setMessage("Creating your travel buddy post...");

//     try {
//       const res = await fetch("/api/travel-buddy/post", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       if (data.success) {
//         setMessage("✅ Post created successfully!");
//         setFormData({ from: "", to: "", date: "", budget: "", notes: "" });

//         // refresh the list after posting
//         const resAll = await fetch("/api/travel-buddy/all");
//         const allData = await resAll.json();
//         if (allData.success) setMatches(allData.buddies);
//       } else {
//         setMessage("❌ Failed to create post.");
//       }
//     } catch (error) {
//       setMessage("❌ Error connecting to server.");
//     }
//   };

//   // 🔍 Find Matching Buddies
//   const handleFind = async (e) => {
//     e.preventDefault();
//     setMessage("Searching for matching travel buddies...");

//     try {
//       const res = await fetch(
//         `/api/travel-buddy/find?from=${search.from}&to=${search.to}`
//       );
//       const data = await res.json();
//       if (data.success) {
//         setMatches(data.matches);
//         setMessage(`✅ Found ${data.matches.length} matches.`);
//       } else {
//         setMessage("❌ No matches found.");
//       }
//     } catch (error) {
//       setMessage("❌ Error fetching data.");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-12">
//       <h1 className="text-3xl font-bold text-center mb-6">
//         🧭 Travel Buddy Dashboard
//       </h1>

//       {/* ✅ CREATE POST SECTION */}
//       <section className="bg-white shadow-lg p-6 rounded-2xl">
//         <h2 className="text-xl font-semibold mb-4">
//           ✈️ Create a Travel Buddy Post
//         </h2>
//         <form onSubmit={handleCreate} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="text"
//               placeholder="From (e.g., Dhaka)"
//               value={formData.from}
//               onChange={(e) =>
//                 setFormData({ ...formData, from: e.target.value })
//               }
//               className="border p-2 rounded-lg"
//               required
//             />
//             <input
//               type="text"
//               placeholder="To (e.g., Cox’s Bazar)"
//               value={formData.to}
//               onChange={(e) =>
//                 setFormData({ ...formData, to: e.target.value })
//               }
//               className="border p-2 rounded-lg"
//               required
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="date"
//               value={formData.date}
//               onChange={(e) =>
//                 setFormData({ ...formData, date: e.target.value })
//               }
//               className="border p-2 rounded-lg"
//               required
//             />
//             <input
//               type="number"
//               placeholder="Budget (e.g., 10000)"
//               value={formData.budget}
//               onChange={(e) =>
//                 setFormData({ ...formData, budget: e.target.value })
//               }
//               className="border p-2 rounded-lg"
//               required
//             />
//           </div>
//           <textarea
//             placeholder="Notes (optional)"
//             value={formData.notes}
//             onChange={(e) =>
//               setFormData({ ...formData, notes: e.target.value })
//             }
//             className="border p-2 rounded-lg w-full"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Create Post
//           </button>
//         </form>
//       </section>

//       {/* 🔍 FIND BUDDY SECTION */}
//       <section className="bg-white shadow-lg p-6 rounded-2xl">
//         <h2 className="text-xl font-semibold mb-4">🔍 Find a Travel Buddy</h2>
//         <form onSubmit={handleFind} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="text"
//               placeholder="From"
//               value={search.from}
//               onChange={(e) => setSearch({ ...search, from: e.target.value })}
//               className="border p-2 rounded-lg"
//             />
//             <input
//               type="text"
//               placeholder="To"
//               value={search.to}
//               onChange={(e) => setSearch({ ...search, to: e.target.value })}
//               className="border p-2 rounded-lg"
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//           >
//             Find Buddy
//           </button>
//         </form>
//       </section>

//       {/* 🌍 ALL BUDDIES SECTION */}
//       <section className="bg-white shadow-lg p-6 rounded-2xl">
//         <h2 className="text-xl font-semibold mb-4">🌍 All Travel Buddy Posts</h2>
//         {matches.length > 0 ? (
//           <div className="space-y-4">
//             {matches.map((buddy, index) => (
//               <div
//                 key={index}
//                 className="border p-4 rounded-lg shadow-sm hover:shadow-md transition"
//               >
//                 <p>
//                   <strong>From:</strong> {buddy.from} →{" "}
//                   <strong>To:</strong> {buddy.to}
//                 </p>
//                 <p>
//                   <strong>Date:</strong>{" "}
//                   {new Date(buddy.date).toLocaleDateString()}
//                 </p>
//                 <p>
//                   <strong>Budget:</strong> {buddy.budget} ৳
//                 </p>
//                 {buddy.notes && <p>📝 {buddy.notes}</p>}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No travel buddy posts yet.</p>
//         )}
//       </section>

//       {/* Status Message */}
//       {message && (
//         <p className="text-center text-blue-600 font-medium">{message}</p>
//       )}
//     </div>
//   );
// }


"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function TravelBuddyPage() {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    budget: "",
    notes: "",
  });

  const [buddies, setBuddies] = useState([]);
  const [message, setMessage] = useState("");
  const [view, setView] = useState("all"); // "all" or "mine"

  // ✅ Load all posts on mount
  useEffect(() => {
    async function loadBuddies() {
      try {
        const res = await fetch("/api/travel-buddy/all");
        const data = await res.json();
        if (data.success) {
          setBuddies(data.buddies);
        }
      } catch (error) {
        console.error("Error loading buddies:", error);
      }
    }
    loadBuddies();
  }, []);

  // ✅ Create Travel Buddy Post
  const handleCreate = async (e) => {
    e.preventDefault();
    setMessage("Creating your travel buddy post...");

    try {
      const res = await fetch("/api/travel-buddy/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("✅ Post created successfully!");
        setFormData({ from: "", to: "", date: "", budget: "", notes: "" });
        setBuddies((prev) => [data.buddy, ...prev]);
      } else {
        setMessage(`❌ ${data.message || "Failed to create post."}`);
      }
    } catch (error) {
      setMessage("❌ Error connecting to server.");
    }
  };

  // 🗑️ Delete Travel Buddy Post
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`/api/travel-buddy/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setBuddies((prev) => prev.filter((b) => b._id !== id));
        setMessage("🗑️ Post deleted successfully.");
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage("❌ Error deleting post.");
    }
  };

  // 🔍 Filter based on view
  const displayedBuddies =
    view === "mine" && session?.user
      ? buddies.filter((b) => b.userEmail === session.user.email)
      : buddies;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <h1 className="text-3xl font-bold text-center mb-6">
        🧭 Travel Buddy Dashboard
      </h1>

      {/* ✅ CREATE POST SECTION */}
      <section className="bg-base-300 shadow-lg p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-4">
          ✈️ Create a Travel Buddy Post
        </h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="From (e.g., Dhaka)"
              value={formData.from}
              onChange={(e) =>
                setFormData({ ...formData, from: e.target.value })
              }
              className="border p-2 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="To (e.g., Cox’s Bazar)"
              value={formData.to}
              onChange={(e) =>
                setFormData({ ...formData, to: e.target.value })
              }
              className="border p-2 rounded-lg"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="border p-2 rounded-lg"
              required
            />
            <input
              type="number"
              placeholder="Budget (e.g., 10000)"
              value={formData.budget}
              onChange={(e) =>
                setFormData({ ...formData, budget: e.target.value })
              }
              className="border p-2 rounded-lg"
              required
            />
          </div>
          <textarea
            placeholder="Notes (optional)"
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            className="border p-2 rounded-lg w-full"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create Post
          </button>
        </form>
      </section>

      {/* 🔁 VIEW TOGGLE BUTTONS */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setView("all")}
          className={`px-4 py-2 rounded-lg ${
            view === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          All Posts
        </button>
        <button
          onClick={() => setView("mine")}
          className={`px-4 py-2 rounded-lg ${
            view === "mine"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          My Posts
        </button>
      </div>

      {/* 📜 POSTS LIST */}
      <section className="bg-base-300 shadow-lg p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-4">
          {view === "mine" ? "🧍‍♂️ My Travel Posts" : "🌍 All Travel Buddy Posts"}
        </h2>

        {displayedBuddies.length > 0 ? (
          <div className="space-y-4">
            {displayedBuddies.map((buddy) => (
              <div
                key={buddy._id}
                className="border p-4 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <p>
                  <strong>From:</strong> {buddy.from} →{" "}
                  <strong>To:</strong> {buddy.to}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(buddy.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Budget:</strong> {buddy.budget} ৳
                </p>
                {buddy.notes && <p>📝 {buddy.notes}</p>}
                <p className="text-sm text-gray-500 mt-1">
                  Posted by: {buddy.userEmail}
                </p>

                {session?.user?.email === buddy.userEmail && (
                  <button
                    onClick={() => handleDelete(buddy._id)}
                    className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No posts found.</p>
        )}
      </section>

      {/* 📨 STATUS MESSAGE */}
      {message && (
        <p className="text-center text-blue-600 font-medium">{message}</p>
      )}
    </div>
  );
}
