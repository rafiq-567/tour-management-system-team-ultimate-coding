import Image from "next/image";
import TourTips from "./components/TourTips";

export default function Home() {
  return (
    <main className="p-6">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Tour Management</h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover amazing tours, book your next adventure, and travel with ease!
        </p>
        <a
          href="/tours"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Browse Tours
        </a>
      </section>
      <TourTips></TourTips>
    </main>
  );
}
