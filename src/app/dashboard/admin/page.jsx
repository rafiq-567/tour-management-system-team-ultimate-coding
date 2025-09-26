'use server'
// app/dashboard/admin/page.jsx

import TourStats from "@/components/tourstacks/TourStats";
import dbConnect from "@/lib/dbConnect";

async function getTours() {
  const tourPackegData = await dbConnect("tourPackegdata");
  const tours = await tourPackegData.find({}).toArray();
  // const serializedTours = post.map((tour) => ({
  //   ...tour,
  //   _id: tour._id.toString(),
  //   createdAt: tour.createdAt ? tour.createdAt.toISOString() : null,
  // }));

  // return Response.json({tours});
  return tours;
}
export default async function AdminPage() {
  const tours = await getTours();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-blue-500">Admin Dashboard</h1>
      <p className="text-gray-600">
        This is the main admin dashboard page. Add stats, charts, or cards here.
      </p>
      <TourStats tours={tours}></TourStats>
    </div>
  );
}
