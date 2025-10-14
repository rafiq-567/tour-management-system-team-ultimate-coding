"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search, MapPin, Waves, Mountain, TreeDeciduous, Landmark, Filter, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

// --- Mock Data (Kept the original Bengali descriptions) ---
const destinations = [
  {
    title: "Cox's Bazar Sea Beach",
    type: "Beach",
    description:
      "বিশ্বের দীর্ঘতম সমুদ্রসৈকত। সূর্যোদয় ও সূর্যাস্ত দেখার অপূর্ব সুযোগ।",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14613.12540706612!2d91.9742558!3d21.4272296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30adc9df6b6e2d19%3A0x47e7c6a72ccb316!2sCox's%20Bazar%20Sea%20Beach!5e0!3m2!1sen!2sbd!4v1695654444444",
  },
  {
    title: "Saint Martin’s Island",
    type: "Beach",
    description:
      "বাংলাদেশের একমাত্র প্রবাল দ্বীপ। নীল পানি আর প্রবালের সৌন্দর্যে ভরপুর।",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3636.960764160204!2d92.3166595!3d20.6274219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ae20a0c0f65f4d%3A0x6e30a95df8333dcb!2sSaint%20Martin%E2%80%99s%20Island!5e0!3m2!1sen!2sbd!4v1695654999999",
  },
  {
    title: "Sajek Valley",
    type: "Hill",
    description: "“বাংলার দার্জিলিং” নামে পরিচিত পাহাড়ে মেঘের রাজ্য।",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.1239965812095!2d92.3265!3d23.3816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374559b0c885cc2b%3A0xa3e7d87b4c9b381c!2sSajek%20Valley!5e0!3m2!1sen!2sbd!4v1695655222222",
  },
  {
    title: "Sundarbans",
    type: "Forest",
    description:
      "বিশ্বের বৃহত্তম ম্যানগ্রোভ বন এবং রয়েল বেঙ্গল টাইগারের আবাসস্থল।",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.2119158435713!2d89.1833!3d21.9497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff59fb5dc50c3f%3A0x77e9a1b671a27d8f!2sSundarbans!5e0!3m2!1sen!2sbd!4v1695655555555",
  },
  {
    title: "Rangamati (Kaptai Lake)",
    type: "Hill",
    description: "পাহাড় ও জলাশয়ের সমন্বয়। কাপটাই লেক বোট রাইডের জন্য বিখ্যাত।",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3704.593808157453!2d92.2009!3d22.5166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3745fb8dbdc85c55%3A0x4b7ac9f7c3b6e635!2sKaptai%20Lake!5e0!3m2!1sen!2sbd!4v1695655777777",
  },
  {
    title: "Bandarban (Nilgiri Hills)",
    type: "Hill",
    description: "মেঘের ভেলা আর পাহাড়ি দৃশ্য উপভোগের অসাধারণ স্থান।",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3714.632207407193!2d92.3574!3d21.9839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37536e9c16c46c7d%3A0xd7a27b7d0e7c2bc2!2sNilgiri%20Hills!5e0!3m2!1sen!2sbd!4v1695656000000",
  },
  {
    title: "Kuakata Sea Beach",
    type: "Beach",
    description:
      "“সাগরকন্যা কুয়াকাটা” থেকে সূর্যোদয় ও সূর্যাস্ত দুটোই দেখা যায়।",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3688.832410507017!2d90.1255!3d21.8191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f9d8b512f3c8c9%3A0xdff6f827f6911a7!2sKuakata%20Sea%20Beach!5e0!3m2!1sen!2sbd!4v1695656222222",
  },
  {
    title: "Paharpur (Somapura Mahavihara)",
    type: "Heritage",
    description: "ইউনেস্কো ওয়ার্ল্ড হেরিটেজ সাইট, প্রাচীন বৌদ্ধ বিহার।",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3738.4185225853857!2d88.9755!3d25.0274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fb9c8f2b60b2ed%3A0xadb53e9f61bb64e1!2sSomapura%20Mahavihara%2C%20Paharpur!5e0!3m2!1sen!2sbd!4v1695656333333",
  },
];

// Map destination types to icons and colors
const typeMap = {
  "Beach": { icon: Waves, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/50" },
  "Hill": { icon: Mountain, color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/50" },
  "Forest": { icon: TreeDeciduous, color: "text-emerald-700", bg: "bg-emerald-100 dark:bg-emerald-900/50" },
  "Heritage": { icon: Landmark, color: "text-yellow-600", bg: "bg-yellow-100 dark:bg-yellow-900/50" },
  "All": { icon: Filter, color: "text-gray-500", bg: "bg-gray-200 dark:bg-gray-600" },
};

// Destination Card Component for better separation of concerns and styling
const DestinationCard = ({ place }) => {
  const { icon: Icon, color, bg } = typeMap[place.type] || typeMap["All"];
  
  return (
    <div className="bg-base-300 dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] border border-gray-200 dark:border-gray-700">
      
      {/* Map Embed */}
      <div className="h-64 w-full">
        <iframe
          title={place.title}
          src={place.map}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className="rounded-t-3xl"
        ></iframe>
      </div>

      <div className="p-6">
        {/* Title and Type Tag */}
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-2xl font-extrabold dark:text-gray-100 leading-snug">
            {place.title}
          </h2>
          <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${color} ${bg} whitespace-nowrap`}>
            <Icon size={16} />
            {place.type}
          </span>
        </div>
        
        {/* Description */}
        <p className="text-base dark:text-gray-300 mt-2 border-l-4 border-blue-500 dark:border-blue-400 pl-3">
          {place.description}
        </p>
      </div>
    </div>
  );
};


export default function Destinations() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  // Filter by search & category
  const filteredDestinations = useMemo(() => {
    // Reset page on filter change
    setCurrentPage(1); 
    
    return destinations.filter((place) => {
      const matchesSearch = place.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesFilter = filter === "All" || place.type === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredDestinations.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Optional: scroll to the top of the content area for better UX
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Available filter options based on unique types in data
  const filterOptions = useMemo(() => {
    const types = destinations.map(d => d.type);
    return ["All", ...new Set(types)].filter(t => t); // Ensure "All" is first and unique, non-empty
  }, []);

  return (
    <div className="min-h-screen bg-base-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Header */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center dark:text-gray-100 mb-2">
            বাংলাদেশের সেরা গন্তব্যসমূহ
        </h1>
        <p className="text-center text-xl dark:text-gray-400 mb-10">
            অনুসন্ধান করুন এবং আপনার পরবর্তী ছুটির পরিকল্পনা করুন।
        </p>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 p-6 bg-base-300 dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          
          {/* Search Input */}
          <div className="w-full md:w-3/5 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="গন্তব্য খুঁজুন (যেমন: Cox's Bazar)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-base-100 dark:bg-gray-700 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-400/50 focus:border-blue-500"
            />
          </div>

          {/* Filter Select */}
          <div className="w-full md:w-2/5 relative flex items-center">
            <MapPin className="absolute left-4 h-5 w-5 text-gray-400 pointer-events-none" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl appearance-none bg-base-100 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-400/50 focus:border-blue-500 cursor-pointer"
            >
              {filterOptions.map(option => (
                  <option key={option} value={option}>
                      {option === 'All' ? 'সব গন্তব্য' : option}
                  </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid gap-10 md:grid-cols-2">
          {currentItems.length > 0 ? (
            currentItems.map((place, idx) => (
              <DestinationCard key={idx} place={place} />
            ))
          ) : (
            <p className="md:col-span-2 text-center py-10 text-xl text-gray-500 dark:text-gray-400">
              আপনার অনুসন্ধানের সাথে মেলে এমন কোনো গন্তব্য খুঁজে পাওয়া যায়নি।
            </p>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 mt-12">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-5 py-2 inline-flex items-center gap-2 bg-blue-600 text-white rounded-full font-semibold shadow-md hover:bg-blue-700 disabled:opacity-40 transition-colors duration-200"
            >
              <ChevronLeft size={20} />
              পূর্ববর্তী
            </button>
            
            {/* Page Status */}
            <span className="font-bold text-lg dark:text-gray-200">
              পেজ {currentPage} / {totalPages}
            </span>
            
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-5 py-2 inline-flex items-center gap-2 bg-blue-600 text-white rounded-full font-semibold shadow-md hover:bg-blue-700 disabled:opacity-40 transition-colors duration-200"
            >
              পরবর্তী
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Add ChevronDown icon for better select styling
const ChevronDown = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
