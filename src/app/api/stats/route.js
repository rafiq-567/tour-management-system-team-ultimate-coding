import dbConnect from "@/lib/dbConnect";

export async function GET(req) {
  try {
    // Get collections
    const bookingsCollection = dbConnect("bookings");
    const usersCollection = dbConnect("user");
    const packagesCollection = dbConnect("tourPackages");

    // Total counts
    const totalBookings = await bookingsCollection.countDocuments();
    //console.log("Total Bookings:", totalBookings);
    const totalUsers = await usersCollection.countDocuments();
    //console.log("Total Users:", totalUsers);
    const totalPackages = await packagesCollection.countDocuments();
    //console.log("Total Packages:", totalPackages);

    // Monthly bookings
    const bookingsAgg = await bookingsCollection.aggregate([
      { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } },
      { $sort: { "_id": 1 } },
    ]).toArray();

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const bookings = bookingsAgg.map(b => ({
      month: months[b._id - 1],
      count: b.count
    }));

    // Package popularity
    const packagesAgg = await bookingsCollection.aggregate([
      { $group: { _id: "$packageName", count: { $sum: 1 } } }
    ]).toArray();

    const packages = packagesAgg.map(p => ({
      name: p._id,
      count: p.count
    }));

    return new Response(
      JSON.stringify({ totalBookings, totalUsers, totalPackages, bookings, packages }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch stats" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
