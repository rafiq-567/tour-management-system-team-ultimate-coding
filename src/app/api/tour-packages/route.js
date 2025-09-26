import dbConnect from "@/lib/dbConnect";

// CREATE (POST) - Add new tour package
export async function POST(req) {
  try {
    const body = await req.json();
    const collection = await dbConnect("tourPackages");

    const newPackage = {
      title: body.title,
      description: body.description,
      price: body.price,
      duration: body.duration,
      image: body.image,
      activities: body.activities || [],
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newPackage);

    return Response.json({ ...newPackage, _id: result.insertedId });
  } catch (err) {
    console.error("POST /tour-packages error:", err);
    return Response.json(
      { error: "Failed to save tour package" },
      { status: 500 }
    );
  }
}

// READ ALL (GET) - Fetch all packages
export async function GET() {
  try {
    const collection = await dbConnect("tourPackages");
    const packages = await collection.find().toArray();

    return Response.json(packages);
  } catch (err) {
    console.error("GET /tour-packages error:", err);
    return Response.json(
      { error: "Failed to fetch tour packages" },
      { status: 500 }
    );
  }
}
