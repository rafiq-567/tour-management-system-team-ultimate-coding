import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const collection = await dbConnect("tourPackages");
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title") || "";
    const sort = searchParams.get("sort") || "latest";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 6;

    // Search query
    const query = title
      ? { title: { $regex: title, $options: "i" } }
      : {};

    // Sorting
    let sortOption = {};
    if (sort === "latest") sortOption = { createdAt: -1 };
    if (sort === "related") sortOption = { price: 1 };
    if (sort === "all") sortOption = { _id: -1 };

    // Count total
    const total = await collection.countDocuments(query);

    // Get paginated data
    const tours = await collection
      .find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    // Convert _id
    const serializedTours = tours.map((t) => ({
      ...t,
      _id: t._id.toString(),
    }));

    return Response.json({
      tours: serializedTours,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("GET /api/tour-packages/search error:", err);
    return Response.json({ error: "Failed to fetch tours" }, { status: 500 });
  }
}
