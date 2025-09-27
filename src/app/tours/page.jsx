import TourList from "@/components/tours/TourList";


export default function ToursPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Explore Tours</h1>
      <TourList />
    </div>
  );
}
