// import dbConnect from "@/lib/dbConnect";
// import { ObjectId } from "mongodb";

// export async function GET(req, context) {
//   try {
//     // Await params before using
//     const { params } = await context;
//     const { id } = params;

//     const collection = await dbConnect("tourPackages");

//     const tourPackage = await collection.findOne({ _id: new ObjectId(id) });

//     if (!tourPackage) {
//       return Response.json({ error: "Package not found" }, { status: 404 });
//     }

//     return Response.json(tourPackage);
//   } catch (err) {
//     console.error("GET /tour-packages/[id] error:", err);
//     return Response.json({ error: "Failed to fetch package" }, { status: 500 });
//   }
// }

// // Same applies for PUT & DELETE
// export async function PUT(req, context) {
//   try {
//     const { params } = await context;
//     const { id } = params;

//     const body = await req.json();
//     const collection = await dbConnect("tourPackages");

//     const updatedPackage = {
//       title: body.title,
//       description: body.description,
//       price: body.price,
//       duration: body.duration,
//       image: body.image,
//       activities: body.activities || [],
//       updatedAt: new Date(),
//     };

//     const result = await collection.updateOne(
//       { _id: new ObjectId(id) },
//       { $set: updatedPackage }
//     );

//     if (result.matchedCount === 0) {
//       return Response.json({ error: "Package not found" }, { status: 404 });
//     }

//     return Response.json({ _id: id, ...updatedPackage });
//   } catch (err) {
//     console.error("PUT /tour-packages/[id] error:", err);
//     return Response.json(
//       { error: "Failed to update package" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(req, context) {
//   try {
//     const { params } = await context;
//     const { id } = params;

//     const collection = await dbConnect("tourPackages");

//     const result = await collection.deleteOne({ _id: new ObjectId(id) });

//     if (result.deletedCount === 0) {
//       return Response.json({ error: "Package not found" }, { status: 404 });
//     }

//     return Response.json({ success: true, message: "Package deleted" });
//   } catch (err) {
//     console.error("DELETE /tour-packages/[id] error:", err);
//     return Response.json(
//       { error: "Failed to delete package" },
//       { status: 500 }
//     );
//   }
// }



import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// ✅ GET by ID
export async function GET(req, { params }) {
  try {
    const { id } = params;

    const collection = await dbConnect("tourPackages");
    const tourPackage = await collection.findOne({ _id: new ObjectId(id) });

    if (!tourPackage) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    return NextResponse.json(tourPackage);
  } catch (err) {
    console.error("GET /tour-packages/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch package" }, { status: 500 });
  }
}

// ✅ PUT by ID
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();

    const collection = await dbConnect("tourPackages");

    const updatedPackage = {
      title: body.title,
      description: body.description,
      price: body.price,
      duration: body.duration,
      image: body.image,
      activities: body.activities || [],
      updatedAt: new Date(),
    };

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedPackage }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    return NextResponse.json({ _id: id, ...updatedPackage });
  } catch (err) {
    console.error("PUT /tour-packages/[id] error:", err);
    return NextResponse.json({ error: "Failed to update package" }, { status: 500 });
  }
}

// ✅ DELETE by ID
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const collection = await dbConnect("tourPackages");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Package deleted" });
  } catch (err) {
    console.error("DELETE /tour-packages/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete package" }, { status: 500 });
  }
}
