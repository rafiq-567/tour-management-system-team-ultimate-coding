// lib/aiService.js

import { tours } from "@/data/tourData";
import { getUserPreferences } from "@/data/userData";

/**
 * AI Personalization Logic: ইউজারের আগ্রহের ভিত্তিতে ট্যুরগুলোকে স্কোরিং করে সাজানো হয়।
 * @param {string} userId - বর্তমানে লগইন থাকা ইউজারের ID
 * @returns {Array} সাজানো ট্যুর প্যাকেজের অ্যারে (AI Score সহ)
 */
export function getPersonalizedTours(userId) {
  const userInterests = getUserPreferences(userId);

  // যদি ইউজারের কোনো আগ্রহের ডেটা না থাকে, তবে ট্যুরগুলো স্বাভাবিকভাবেই ফেরত যাবে
  if (userInterests.length === 0) {
    return tours;
  }

  // ১. স্কোরিং প্রক্রিয়া (Scoring Process)
  const scoredTours = tours.map(tour => {
    let score = 0;
    
    // ট্যাগ মিলিয়ে স্কোর বাড়ানো
    tour.tags.forEach(tag => {
      if (userInterests.includes(tag)) {
        score += 1;
      }
    });

    return { ...tour, personalizationScore: score };
  });

  // ২. সাজানোর প্রক্রিয়া (Sorting): সর্বোচ্চ স্কোরপ্রাপ্ত ট্যুর সবার উপরে
  scoredTours.sort((a, b) => b.personalizationScore - a.personalizationScore);

  return scoredTours;
}