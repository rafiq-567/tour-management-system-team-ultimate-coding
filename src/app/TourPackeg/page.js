"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

const TourPackegPage = () => {
  const [tours, setTours] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://tour-management-system-team-ultimat-lovat.vercel.app/tourData.json"
        );
        const data = await res.json();
        setTours(data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };
    fetchData();
  }, []);

  // filter + search
  const filteredTours = tours
    .filter((tour) => tour.title.toLowerCase().includes(search.toLowerCase()))
    .filter((tour) => {
      if (filter === "all") return true;
      if (filter === "latest") return tour.latest === true;
      if (filter === "popular") return tour.popular === true;
      if (filter === "budget") return tour.price <= 300;
      return true;
    });

  // Pagination Logic
  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);
  const totalPages = Math.ceil(filteredTours.length / toursPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="py-12">
      <h1 className="md:text-4xl text-2xl font-bold text-center mb-10">
        Choose your Best <span className="text-blue-600">Tour</span> Package
      </h1>

      {/* Search + Filter */}
      <div className="w-11/12 mx-auto flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
        <input
          type="text"
          placeholder="Search tour by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex flex-wrap gap-2">
          {["all", "latest", "popular", "budget"].map((btn) => (
            <button
              key={btn}
              onClick={() => {
                setFilter(btn);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all duration-300 ${
                filter === btn
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-600"
              }`}
            >
              {btn.charAt(0).toUpperCase() + btn.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tour Cards */}
      <div className="w-11/12 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {currentTours.map((tour) => (
          <div key={tour._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <div className="object-center">
              <Image
                src={tour.image}
                width={400}
                height={250}
                className="object-cover w-full h-48"
                alt={tour.title}
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold mt-2">{tour.title}</h2>
              <p className="text-gray-400 mt-1 line-clamp-2">{tour.description}</p>
              <p className="mt-2 font-semibold">Duration: {tour.duration}</p>
              <p className="text-blue-600 font-bold mb-4">Price: ${tour.price}</p>
              <Link
                key={tour._id} // unique key
                href={`/TourPackeg/${tour._id}`}
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-amber-500 transition-all"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-600"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TourPackegPage;
