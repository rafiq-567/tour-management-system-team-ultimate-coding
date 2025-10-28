// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { MapPin, Calendar, DollarSign, Plane, ArrowLeft } from "lucide-react";

// export default function TourList() {
//   const [tours, setTours] = useState([]);
//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("latest");
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [relatedTours, setRelatedTours] = useState([]);

//   useEffect(() => {
//     const fetchTours = async () => {
//       const res = await fetch(
//         `/api/tour-packages/search?title=${search}&sort=${sort}&page=${page}`
//       );
//       const data = await res.json();
//       setTours(data.tours || []);
//       setTotalPages(data.totalPages || 1);

//       // Fetch related tours based on first tour
//       if (data.tours?.length > 0) {
//         const relatedRes = await fetch(
//           `/api/tour-packages/related?title=${data.tours[0].title}`
//         );
//         const relatedData = await relatedRes.json();
//         setRelatedTours(relatedData.tours || []);
//       } else {
//         setRelatedTours([]);
//       }
//     };
//     fetchTours();
//   }, [search, sort, page]);

//   return (
//     <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      

//       {/* Search + Sort */}
//       <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
//         <input
//           type="text"
//           placeholder="🔍 Search tour by title..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setPage(1);
//           }}
//           className="border border-gray-300 bg-white/70 backdrop-blur-md px-4 py-3 rounded-xl w-full md:w-1/2 shadow-sm focus:ring-2 focus:ring-blue-400"
//         />
//         <select
//           value={sort}
//           onChange={(e) => {
//             setSort(e.target.value);
//             setPage(1);
//           }}
//           className="border border-gray-300 bg-white/70 backdrop-blur-md px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
//         >
//           <option value="all">All</option>
//           <option value="latest">Latest</option>
//           <option value="related">Most Related</option>
//         </select>
//       </div>

//       {/* Tour Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {tours.map((tour) => (
//           <motion.div
//             key={tour._id}
//             whileHover={{ scale: 1.04 }}
//             transition={{ type: "spring", stiffness: 200 }}
//             className="bg-white/60 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl overflow-hidden relative group"
//           >
//             <div className="relative">
//               <img
//                 src={tour.image}
//                 alt={tour.title}
//                 className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
//               />
//               <div className="absolute top-3 left-3 bg-white/80 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
//                 <Plane className="w-3 h-3" /> {tour.duration || "3 Days"}
//               </div>
//             </div>

//             <div className="p-5 flex flex-col justify-between min-h-[220px]">
//               <div>
//                 <h2 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
//                   {tour.title}
//                 </h2>
//                 <p className="text-sm text-gray-600 line-clamp-2">
//                   {tour.description}
//                 </p>

//                 <div className="mt-3 flex items-center text-gray-500 text-sm gap-2">
//                   <MapPin className="w-4 h-4 text-blue-500" />
//                   {tour.location || "Unknown Destination"}
//                 </div>

//                 <div className="mt-1 flex items-center text-gray-500 text-sm gap-2">
//                   <Calendar className="w-4 h-4 text-blue-500" />
//                   {tour.date || "Flexible Date"}
//                 </div>
//               </div>

//               <div className="mt-5 flex items-center justify-between">
//                 <span className="text-lg font-semibold text-blue-700 flex items-center gap-1">
//                   <DollarSign className="w-5 h-5" /> {tour.price}
//                 </span>
//                 <Link
//                   href={`/tours/${tour._id}`}
//                   className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium rounded-lg shadow hover:shadow-md hover:from-blue-700 hover:to-cyan-600 transition-all"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center items-center mt-10 gap-2">
//         <button
//           disabled={page === 1}
//           onClick={() => setPage((p) => p - 1)}
//           className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100 transition-colors"
//         >
//           Prev
//         </button>
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => setPage(i + 1)}
//             className={`px-4 py-2 border rounded-lg ${
//               page === i + 1
//                 ? "bg-blue-600 text-white shadow"
//                 : "hover:bg-gray-100"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage((p) => p + 1)}
//           className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100 transition-colors"
//         >
//           Next
//         </button>
//       </div>

//       {/* Most Related Tours */}
//       {relatedTours.length > 0 && (
//         <div className="mt-16">
//           <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
//             Most Related Tours
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {relatedTours.map((tour) => (
//               <motion.div
//                 key={tour._id}
//                 whileHover={{ scale: 1.03 }}
//                 className="bg-white/50 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl overflow-hidden relative group"
//               >
//                 <img
//                   src={tour.image}
//                   alt={tour.title}
//                   className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//                 <div className="p-4 flex flex-col gap-2">
//                   <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
//                     {tour.title}
//                   </h3>
//                   <p className="text-sm text-gray-600 line-clamp-2">
//                     {tour.description}
//                   </p>
//                   <Link
//                     href={`/tours/${tour._id}`}
//                     className="mt-2 inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Calendar, DollarSign, Plane, ArrowLeft } from "lucide-react";

export default function TourList() {
  const [tours, setTours] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [relatedTours, setRelatedTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      const res = await fetch(
        `/api/tour-packages/search?title=${search}&sort=${sort}&page=${page}`
      );
      const data = await res.json();
      setTours(data.tours || []);
      setTotalPages(data.totalPages || 1);

      // Fetch related tours based on first tour
      if (data.tours?.length > 0) {
        const relatedRes = await fetch(
          `/api/tour-packages/related?title=${data.tours[0].title}`
        );
        const relatedData = await relatedRes.json();
        setRelatedTours(relatedData.tours || []);
      } else {
        setRelatedTours([]);
      }
    };
    fetchTours();
  }, [search, sort, page]);

  return (
    <div className="p-6 bg-base-300">
      

      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
        <input
          type="text"
          placeholder="🔍 Search tour by title..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 bg-base-100 backdrop-blur-md px-4 py-3 rounded-xl w-full md:w-1/2 shadow-sm focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 bg-base-100 backdrop-blur-md px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All</option>
          <option value="latest">Latest</option>
          <option value="related">Most Related</option>
        </select>
      </div>

      {/* Tour Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tours.map((tour) => (
          <motion.div
            key={tour._id}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-base-300 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl overflow-hidden relative group"
          >
            <div className="relative">
              <img
                src={tour.image}
                alt={tour.title}
                className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-white/80 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                <Plane className="w-3 h-3" /> {tour.duration || "3 Days"}
              </div>
            </div>

            <div className="p-5 flex flex-col justify-between min-h-[220px]">
              <div>
                <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors">
                  {tour.title}
                </h2>
                <p className="text-sm line-clamp-2">
                  {tour.description}
                </p>

                <div className="mt-3 flex items-center text-sm gap-2">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  {tour.location || "Unknown Destination"}
                </div>

                <div className="mt-1 flex items-center text-sm gap-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  {tour.date || "Flexible Date"}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-lg font-semibold text-blue-700 flex items-center gap-1">
                  <DollarSign className="w-5 h-5" /> {tour.price}
                </span>
                <Link
                  href={`/tours/${tour._id}`}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium rounded-lg shadow hover:shadow-md hover:from-blue-700 hover:to-cyan-600 transition-all"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-10 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100 transition-colors"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 border rounded-lg ${
              page === i + 1
                ? "bg-blue-600 text-white shadow"
                : "hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100 transition-colors"
        >
          Next
        </button>
      </div>

      {/* Most Related Tours */}
      {relatedTours.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            Most Related Tours
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedTours.map((tour) => (
              <motion.div
                key={tour._id}
                whileHover={{ scale: 1.03 }}
                className="bg-white/50 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl overflow-hidden relative group"
              >
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
                    {tour.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {tour.description}
                  </p>
                  <Link
                    href={`/tours/${tour._id}`}
                    className="mt-2 inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}