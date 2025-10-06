"use client";

import React, { useState } from "react";
import { Youtube, MapPin, Film, Clock } from "lucide-react";

// --- Travel Blogs Data (Bangladesh Tourist Spots) ---
const travelBlogs = [
  {
    id: 1,
    title: "Cox's Bazar: বিশ্বের দীর্ঘতম সমুদ্রসৈকত",
    excerpt:
      "কক্সবাজার ভ্রমণের সম্পূর্ণ গাইড! কীভাবে যাবেন, থাকার জায়গা, ঘোরার স্পট এবং সূর্যোদয়/সূর্যাস্তের সেরা অভিজ্ঞতা।",
    location: "Cox's Bazar, Bangladesh",
    videoId: "mQalnj34FnM",
    duration: "12 min",
  },
  {
    id: 2,
    title: "Sajek Valley: মেঘের রাজ্যে ভ্রমণ",
    excerpt:
      "বাংলার দার্জিলিং সাজেক ভ্যালি। ভোরবেলার মেঘের সাগর, পাহাড়ি খাবার এবং স্থানীয় জীবনযাত্রার অভিজ্ঞতা।",
    location: "Sajek Valley, Rangamati",
    videoId: "2VGwOZzFUGE",
    duration: "9 min",
  },
  {
    id: 3,
    title: "Saint Martin's Island: প্রবাল দ্বীপ",
    excerpt:
      "বাংলাদেশের একমাত্র প্রবাল দ্বীপ সেন্টমার্টিন! নীল সমুদ্র, প্রবাল এবং সামুদ্রিক খাবারের ভিন্ন জগৎ।",
    location: "Saint Martin’s Island, Cox’s Bazar",
    videoId: "QDEl8P7kdoQ",
    duration: "10 min",
  },
  {
    id: 4,
    title: "Sundarbans: রয়্যাল বেঙ্গল টাইগারের রাজ্যে",
    excerpt:
      "সুন্দরবনের গভীরে ম্যানগ্রোভ বনের বৈচিত্র্য এবং রয়্যাল বেঙ্গল টাইগার দেখার প্রস্তুতি গাইড।",
    location: "Sundarbans, Khulna",
    videoId: "hpgrkNlfMlU",
    duration: "11 min",
  },
];

// --- Video Thumbnail + Player ---
const VideoEmbed = ({ videoId, title }) => {
  const [play, setPlay] = useState(false);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg shadow border border-gray-200 dark:border-gray-700 aspect-video cursor-pointer"
      onClick={() => setPlay(true)}
    >
      {play ? (
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={embedUrl}
          title={`YouTube video player for ${title}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <>
          <img
            src={thumbnailUrl}
            alt={title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <Youtube size={48} className="text-white" />
          </div>
        </>
      )}
    </div>
  );
};

// --- Blog Card ---
const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition duration-200 p-4 border border-gray-100 dark:border-gray-700">
      <VideoEmbed videoId={blog.videoId} title={blog.title} />

      <div className="mt-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
          {blog.title}
        </h3>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span className="flex items-center">
            <MapPin size={14} className="mr-1 text-red-500" />
            {blog.location}
          </span>
          <span className="flex items-center">
            <Clock size={14} className="mr-1 text-blue-500" />
            {blog.duration}
          </span>
          <span className="flex items-center">
            <Film size={14} className="mr-1 text-green-500" />
            Vlog
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3 line-clamp-3">
          {blog.excerpt}
        </p>
      </div>
    </div>
  );
};

// --- Main Section ---
export default function TravelBlogSection() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-sm font-semibold tracking-wider text-red-600 uppercase dark:text-red-400">
            ভিডিও গাইড
          </h2>
          <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-gray-100">
            বাংলাদেশের শীর্ষ পর্যটন স্থান
          </p>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
            ভ্রমণের আগে আমাদের ছোট ভিডিও ব্লগ গুলো দেখে নিন।
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {travelBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
