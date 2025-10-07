"use client";
import { useState } from "react";
import { Heart, Trash2 } from "lucide-react"; // icons

export default function WishlistPage() {
  // static data
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      title: "Dubai City Tour",
      image: "https://i.postimg.cc/Z5gvPN2W/Dubai.jpg",
      price: 350,
      duration: "3 Days / 2 Nights",
    },
    {
      id: 2,
      title: "Maldives Paradise Escape",
      image: "https://i.postimg.cc/mk8tP172/maldives.jpg",
      price: 780,
      duration: "5 Days / 4 Nights",
    },
    {
      id: 3,
      title: "Bangkok Adventure",
      image: "https://i.postimg.cc/JnqwfcRz/bangokok.jpg",
      price: 420,
      duration: "4 Days / 3 Nights",
    },
    {
      id: 4,
      title: "Singapore City Lights",
      image: "https://i.postimg.cc/Df4fWRfr/singapore-marina-bay-sands-downtown-cityscape-city-lights-3840x2160-1312.jpg",
      price: 720,
      duration: "4 Days / 3 Nights",
    },
  ]);

  // remove item from wishlist
  const handleRemove = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-gray-100 flex items-center gap-2">
        <Heart className="text-red-500" /> My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-gray-500 text-lg">Your wishlist is empty 😢</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{tour.title}</h2>
                <p className="text-sm text-gray-500 mb-2">{tour.duration}</p>
                <p className="text-blue-600 font-bold mb-4">${tour.price}</p>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleRemove(tour.id)}
                    className="flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-200 transition"
                  >
                    <Trash2 size={18} />
                    Remove
                  </button>

                  <button className="bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
