"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function TourList() {
  const [tours, setTours] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTours = async () => {
      const res = await fetch(
        `/api/tour-packages/search?title=${search}&sort=${sort}&page=${page}`
      );
      const data = await res.json();
      setTours(data.tours || []);
      setTotalPages(data.totalPages || 1);
    };
    fetchTours();
  }, [search, sort, page]);

  return (
    <div className="p-6">
      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset page when searching
          }}
          className="border px-4 py-2 rounded-lg w-full md:w-1/2 shadow-sm focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1); // reset page when sorting
          }}
          className="border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All</option>
          <option value="latest">Latest</option>
          <option value="related">Related</option>
        </select>
      </div>

      {/* Tour Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <div
            key={tour._id}
            className="bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            <img
              src={tour.image}
              alt={tour.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-800">{tour.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {tour.description}
                </p>
                <p className="font-semibold text-blue-600 mt-2">
                  ${tour.price}
                </p>
                <p className="text-sm text-gray-500">{tour.duration}</p>
                <ul className="text-xs mt-2 text-gray-500 list-disc pl-4">
                  {tour.activities?.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
              {/* Details Button */}
              <div className="mt-4">
                <Link
                  href={`/tours/${tour._id}`}
                  className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border rounded-lg ${
              page === i + 1
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
}
