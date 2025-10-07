import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("tour_management");

    const tours = await db.collection("tours").find({}).toArray();
    const bookings = await db.collection("bookings").find({}).toArray();

    const totalTours = tours.length;
    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);
    const avgPrice = tours.length > 0
      ? (tours.reduce((sum, t) => sum + (t.price || 0), 0) / tours.length).toFixed(2)
      : 0;

    // Most popular tour (by bookings)
    const tourCounts = bookings.reduce((acc, b) => {
      acc[b.tourId] = (acc[b.tourId] || 0) + 1;
      return acc;
    }, {});

    let popularTour = null;
    if (Object.keys(tourCounts).length > 0) {
      const topTourId = Object.keys(tourCounts).sort((a, b) => tourCounts[b] - tourCounts[a])[0];
      popularTour = tours.find(t => t._id.toString() === topTourId)?.title || "N/A";
    }

    res.json({
      totalTours,
      totalBookings,
      totalRevenue,
      avgPrice,
      popularTour,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching analytics" });
  }
}
