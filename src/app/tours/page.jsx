const tours = [
  { id: 1, title: "Cox's Bazar Beach Tour", price: "$120", image: "https://picsum.photos/400/250?1" },
  { id: 2, title: "Sundarbans Adventure", price: "$250", image: "https://picsum.photos/400/250?2" },
  { id: 3, title: "Saint Martin Island Escape", price: "$180", image: "https://picsum.photos/400/250?3" },
];

export default function ToursPage() {
  return (
    <main className="p-6">
      <h2 className="text-3xl font-bold mb-6">Available Tours</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {tours.map((tour) => (
          <div key={tour.id} className="border rounded-lg shadow hover:shadow-lg transition">
            <img src={tour.image} alt={tour.title} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{tour.title}</h3>
              <p className="text-gray-600">{tour.price}</p>
              <a
                href={`/tours/${tour.id}`}
                className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
