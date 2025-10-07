import TourList from "@/components/tours/TourList";


export default function ToursPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 align-items-center flex">Explore Tours</h1>
      <h3 className="text-xl font-semibold mb-4">Discover the best tours available</h3>
      <TourList />
    </div>
  );
}
