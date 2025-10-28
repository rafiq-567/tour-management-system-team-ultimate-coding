
// "use client";

// import { useState } from "react";
// import { useSession } from "next-auth/react";
// import BookingModal from "@/components/booking/BookingModal";

// export default function SmartBudgetTour() {
//   const { data: session } = useSession();
//   const [budget, setBudget] = useState("");
//   const [tours, setTours] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [selectedTour, setSelectedTour] = useState(null); // 👈 for modal control

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setTours([]);

//     try {
//       const res = await fetch("/api/tours/suggest", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ budget }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "No tours found.");
//       } else {
//         setTours(data);
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       id="smart-budget"
//       className="max-w-xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl"
//     >
//       <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">
//         🧠 Smart Budget Tour Suggestion
//       </h2>

//       {/* Budget form */}
//       <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
//         <input
//           type="number"
//           placeholder="Enter your budget (৳)"
//           value={budget}
//           onChange={(e) => setBudget(e.target.value)}
//           className="flex-1 p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
//           required
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
//         >
//           {loading ? "Finding..." : "Find Tours"}
//         </button>
//       </form>

//       {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

//       {/* Tour suggestions */}
//       <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {tours.map((tour) => (
//           <div
//             key={tour._id}
//             className="p-4 border rounded-lg shadow hover:shadow-md transition"
//           >
//             <img
//               src={tour.image}
//               alt={tour.title}
//               className="rounded-lg w-full h-40 object-cover"
//             />
//             <h3 className="mt-3 text-lg font-semibold">{tour.title}</h3>
//             <p className="text-sm text-gray-600 dark:text-gray-300">
//               {tour.duration}
//             </p>
//             <p className="mt-2 text-blue-600 font-bold">৳ {tour.price}</p>
//             <button
//               onClick={() => setSelectedTour(tour)}
//               className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium"
//             >
//               Book Now
//             </button>
//           </div>
//         ))}
//       </div>



"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import BookingModal from "@/components/booking/BookingModal";
// import BookingModal from "@/components/booking/BookingModal";

export default function SmartBudgetTour() {
  const { data: session } = useSession();
  const [budget, setBudget] = useState("");
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedTour, setSelectedTour] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTours([]);

    try {
      const res = await fetch("/api/tours/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ budget }),
      });

      const data = await res.json();
      if (!res.ok) setError(data.message || "No tours found.");
      else setTours(data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="smart-budget"
      className="max-w-5xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl"
    >
      <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">
        🧠 Smart Budget Tour Suggestion
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="number"
          placeholder="Enter your budget (৳)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="flex-1 p-3 border rounded-lg dark:bg-gray-700 dark:text-white"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          {loading ? "Finding..." : "Find Tours"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tours.map((tour) => (
          <div
            key={tour._id}
            className="p-4 border rounded-lg shadow hover:shadow-md transition flex flex-col"
          >
            <img
              src={tour.image}
              alt={tour.title}
              className="rounded-lg w-full h-40 object-cover"
            />
            <h3 className="mt-3 text-lg font-semibold">{tour.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {tour.duration}
            </p>
            <p className="mt-2 text-blue-600 font-bold">৳ {tour.price}</p>

            <div className="mt-4 flex flex-col gap-2">
              <Link
                href={`/tours/${tour._id}`}
                className="text-center w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition"
              >
                View Details
              </Link>

              <button
                onClick={() => setSelectedTour(tour)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedTour && session && (
        <BookingModal
          tour={selectedTour}
          onClose={() => setSelectedTour(null)}
        />
      )}
    </div>
  );
}
