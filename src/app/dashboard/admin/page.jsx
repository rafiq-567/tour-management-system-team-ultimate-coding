"use server";
// app/dashboard/admin/page.jsx
import dbConnect from "@/lib/dbConnect";
import SalesChartCard from "./component/SalesChartCard";

// Simulated monthly sales data
const monthlySales = [
  { month: "Jan", sales: 25000 },
  { month: "Feb", sales: 32000 },
  { month: "Mar", sales: 45000 },
  { month: "Apr", sales: 40000 },
  { month: "May", sales: 55000 },
  { month: "Jun", sales: 62000 },
  { month: "Jul", sales: 58000 },
  { month: "Aug", sales: 70000 },
  { month: "Sep", sales: 65000 },
  { month: "Oct", sales: 78000 },
  { month: "Nov", sales: 85000 },
  { month: "Dec", sales: 95000 },
];

// Fetch recent tours from MongoDB
async function getTours() {
  const tourPackegData = await dbConnect("tourPackegdata");
  const tours = await tourPackegData.find({}).sort({ createdAt: -1 }).limit(5).toArray();
  return tours.map((tour) => ({
    _id: tour._id.toString(),
    title: tour.title,
    price: tour.price,
    createdAt: tour.createdAt ? tour.createdAt.toISOString() : null,
  }));
}

// Simulated recent bookings data
const recentBookings = [
  { user: "Alice", packageTitle: "Swiss Alps Explorer" },
  { user: "Bob", packageTitle: "Beach Paradise Tour" },
  { user: "Charlie", packageTitle: "Safari Adventure" },
];

export default async function AdminPage() {
  const recentPackages = await getTours(); // fetch latest packages from DB

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-500">Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">
        This is the main admin dashboard page. Add stats, charts, or cards here.
      </p>

      <SalesChartCard
        data={monthlySales}
        recentPackages={recentPackages}
        recentBookings={recentBookings}
      />
    </div>
  );
}
