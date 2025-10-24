"use client";

import React, { useState } from "react";
import RoomCard from "./RoomCard";

export default function RoomBookPage() {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Hotel Sea View",
      type: "Deluxe",
      price: 120,
      rating: 4,
      available: true,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      description:
        "Experience luxury with an ocean view, complimentary breakfast, and premium amenities.",
    },
    {
      id: 2,
      name: "Hilltop Resort",
      type: "Standard",
      price: 80,
      rating: 5,
      available: true,
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/640278495.jpg?k=d01b304a29089108ae381173be12460b5524ea2ce71cf3203fa2dcea36d370a8&o=&hp=1",
      description:
        "Enjoy the tranquility of the hills with cozy rooms and breathtaking sunrise views.",
    },
    {
      id: 3,
      name: "Sundarban Eco Stay",
      type: "Cottage",
      price: 100,
      rating: 3,
      available: false,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBKCKrz5yKmFJCosglRJoG0AKMQBo_Up0l6Q&s",
      description:
        "Stay close to nature in our eco-friendly cottages inside the forest area.",
    },
  ]);

  const [selectedRoom, setSelectedRoom] = useState(null); // modal state

  const handleBook = (id) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === id ? { ...room, available: false } : room
      )
    );
    setSelectedRoom(null);
    alert(`✅ Room ${id} booked successfully!`);
  };

  return (
    <section className="container mx-auto max-w-7xl py-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold mb-2">
          🏨 Explore Our Top Rooms
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover comfortable stays with real-time availability. Choose your
          perfect getaway!
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} onDetails={setSelectedRoom} />
        ))}
      </div>

      {/* 🪟 Modal Popup */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-lg w-full shadow-lg relative">
            <button
              onClick={() => setSelectedRoom(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              ✕
            </button>

            <img
              src={selectedRoom.image}
              alt={selectedRoom.name}
              className="w-full h-56 object-cover rounded-xl mb-4"
            />

            <h2 className="text-2xl font-bold mb-2">{selectedRoom.name}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Type: {selectedRoom.type}
            </p>
            <p className="font-semibold text-emerald-600 mb-3">
              Price: ${selectedRoom.price}
            </p>
            <p className="text-gray-700 dark:text-gray-400 mb-6">
              {selectedRoom.description}
            </p>

            <button
              onClick={() => handleBook(selectedRoom.id)}
              disabled={!selectedRoom.available}
              className={`w-full py-3 rounded-xl text-white font-semibold ${
                selectedRoom.available
                  ? "bg-emerald-500 hover:bg-emerald-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {selectedRoom.available ? "Book Now" : "Already Booked"}
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-6">
        <button className="px-6 py-2 bg-emerald-500 text-white text-lg font-semibold rounded-xl hover:bg-emerald-600 transition-all duration-200">
          See More
        </button>
      </div>
    </section>
  );
}
