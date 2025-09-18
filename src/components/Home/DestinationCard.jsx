import React from "react";

const destinations = [
  {
    id: 1,
    image: "https://placehold.co/600x400/29B6F6/ffffff?text=Cox's+Bazar",
    name: "Cox's Bazar",
    description:
      "World’s longest natural sea beach with golden sands and breathtaking sunsets.",
    price: "800",
  },
  {
    id: 2,
    image: "https://placehold.co/600x400/FFA000/ffffff?text=Saint+Martin's",
    name: "Saint Martin’s Island",
    description:
      "A tropical paradise with crystal-clear water, coral reefs, and palm trees.",
    price: "1000",
  },
  {
    id: 3,
    image: "https://placehold.co/600x400/9CCC65/ffffff?text=Sundarbans",
    name: "Sundarbans",
    description:
      "The largest mangrove forest in the world, home to the Royal Bengal Tiger.",
    price: "1200",
  },
  {
    id: 4,
    image: "https://placehold.co/600x400/FF7043/ffffff?text=Srimangal",
    name: "Srimangal",
    description:
      "The tea capital of Bangladesh with lush green tea gardens and serene nature.",
    price: "700",
  },
  {
    id: 5,
    image: "https://placehold.co/600x400/26A69A/ffffff?text=Bandarban",
    name: "Bandarban",
    description:
      "A hill district full of mountains, tribal culture, and adventure trails.",
    price: "900",
  },
  {
    id: 6,
    image: "https://placehold.co/600x400/7E57C2/ffffff?text=Rangamati",
    name: "Rangamati",
    description:
      "Famous for Kaptai Lake, hanging bridges, and natural beauty in the Chittagong Hill Tracts.",
    price: "950",
  },
];

// Single card component
const DestinationCard = ({ image, name, description, price }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div className="relative w-full h-48">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-t-3xl"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {name}
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
        <div className="mt-6 flex justify-between items-center">
          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
            Starting from ${price}
          </span>
          <button className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 font-semibold shadow-md">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Wrapper component to render all cards
const DestinationsList = () => {
  return (
    <div className="container mx-auto px-4 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {destinations.map((dest) => (
        <DestinationCard key={dest.id} {...dest} />
      ))}
    </div>
  );
};

export default DestinationsList;
