const tours = {
  1: { title: "Cox's Bazar Beach Tour", price: "$120", description: "Enjoy the world's longest sea beach with fun activities.", image: "https://picsum.photos/800/400?1" },
  2: { title: "Sundarbans Adventure", price: "$250", description: "Explore the home of the Royal Bengal Tiger and mangrove forests.", image: "https://picsum.photos/800/400?2" },
  3: { title: "Saint Martin Island Escape", price: "$180", description: "Relax on the island paradise with crystal clear waters.", image: "https://picsum.photos/800/400?3" },
};

export default function TourDetailsPage({ params }) {
  const tour = tours[params.id];

  if (!tour) {
    return <p className="p-6">Tour not found.</p>;
  }

  return (
    <main className="p-6">
      <img src={tour.image} alt={tour.title} className="w-full h-96 object-cover rounded-lg mb-6" />
      <h1 className="text-3xl font-bold mb-2">{tour.title}</h1>
      <p className="text-lg text-gray-700 mb-4">{tour.description}</p>
      <p className="text-xl font-semibold mb-6">Price: {tour.price}</p>
      <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
        Book Now
      </button>
    </main>
  );
}
