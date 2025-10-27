// "use client";
// import { useEffect, useState } from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// export default function AnalyticsPage() {
//   // Static stats data
//   const stats = [
//     { title: "Total Tours", value: 24 },
//     { title: "Total Revenue", value: "$48,000" },
//     { title: "Total Bookings", value: 320 },
//     { title: "Avg Tour Price", value: "$200" },
//   ];

//   // Static chart data
//   const chartData = [
//     { month: "Jan", bookings: 45 },
//     { month: "Feb", bookings: 60 },
//     { month: "Mar", bookings: 80 },
//     { month: "Apr", bookings: 70 },
//     { month: "May", bookings: 90 },
//     { month: "Jun", bookings: 120 },
//   ];

//   // Static top destinations
//   const destinations = [
//     { id: 1, name: "Dubai City Tour", visitors: 120 },
//     { id: 2, name: "Maldives Paradise", visitors: 95 },
//     { id: 3, name: "Paris Getaway", visitors: 80 },
//     { id: 4, name: "Bali Adventure", visitors: 70 },
//     { id: 5, name: "Singapore Explorer", visitors: 55 },
//   ];

//   return (
//     <div className="p-8 min-h-screen bg-gray-50 dark:bg-gray-900">
//       <h1 className="text-3xl font-bold mb-6 text-gray-300">Analytics Dashboard</h1>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">
//         {stats.map((item, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-all duration-200 hover:bg-blue-950"
//           >
//             <p className="text-gray-500">{item.title}</p>
//             <h2 className="text-2xl font-semibold mt-2 text-blue-600">{item.value}</h2>
//           </div>
//         ))}
//       </div>

//       {/* Chart Section */}
//       <div className="bg-white dark:bg-gray-900  rounded-2xl shadow-md p-6 mb-8">
//         <h2 className="text-xl font-semibold mb-4 text-gray-200">Monthly Bookings Overview</h2>
//         <div className="w-full h-72">
//           <ResponsiveContainer>
//             <BarChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="bookings" fill="#3b82f6" radius={[6, 6, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Top Destinations Table */}
//       <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6">
//         <h2 className="text-xl font-semibold mb-4 text-gray-700">Top Destinations</h2>
//         <table className="min-w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-300 text-gray-600 uppercase text-sm leading-normal">
//               <th className="py-3 px-6 text-left">#</th>
//               <th className="py-3 px-6 text-left">Destination</th>
//               <th className="py-3 px-6 text-left">Visitors</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700">
//             {destinations.map((dest) => (
//               <tr key={dest.id} className="border-b border-gray-200 hover:bg-gray-500">
//                 <td className="py-3 px-6">{dest.id}</td>
//                 <td className="py-3 px-6 font-medium">{dest.name}</td>
//                 <td className="py-3 px-6">{dest.visitors}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function AnalyticsPage() {
  const [stats, setStats] = useState({
    totalTours: 0,
    totalBookings: 0,
    totalRevenue: 0,
    totalUsers: 0,
    activeDiscounts: 0,
    bookingsByMonth: [],
    topTours: [],
  });
console.log(topTours.length)
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/analytics");
      const data = await res.json();
      setStats(data);
    }
    load();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold text-white">📊 Tour Management Analytics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {[
          { label: "Total Tours", value: stats.totalTours },
          { label: "Total Bookings", value: stats.totalBookings },
          { label: "Revenue ($)", value: stats.totalRevenue },
          { label: "Users", value: stats.totalUsers },
          { label: "Active Discounts", value: stats.activeDiscounts },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-5 text-center">
            <p className="text-sm text-gray-500">{item.label}</p>
            <h3 className="text-2xl font-semibold text-blue-600 mt-2">{item.value}</h3>
          </div>
        ))}
      </div>

      {/* Bookings by Month Chart */}
      <div className="bg-white max-w-6xl mx-auto rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">📅 Bookings per Month</h2>
        <Bar
          data={{
            labels: stats.bookingsByMonth.map(b => b.month),
            datasets: [
              {
                label: "Bookings",
                data: stats.bookingsByMonth.map(b => b.count),
                backgroundColor: "#3b82f6",
              },
            ],
          }}
        />
      </div>

      {/* Top Tours */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">🏆 Top Tours by Revenue</h2>
        <ul className="divide-y divide-gray-200">
          {stats.topTours.map((tour, i) => (
            <li key={i} className="flex justify-between py-3 text-gray-700">
              <span>{tour.title}</span>
              <span className="font-medium">${tour.revenue}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
