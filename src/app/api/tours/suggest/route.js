// import dbConnect from "@/lib/dbConnect";

// export async function POST(req) {
//   try {
//     const { budget } = await req.json();

//     // Validate input
//     if (!budget || isNaN(budget)) {
//       return new Response(JSON.stringify({ error: "Invalid budget" }), { status: 400 });
//     }

//     // Connect to your "tourPackages" collection
//     const collection = dbConnect("tourPackages");

//     // Find all tours where price <= budget
//     const results = await collection
//       .find({ price: { $lte: Number(budget) } })
//       .sort({ price: -1 }) // Show higher-priced (best value) tours first
//       .limit(10)
//       .toArray();

//     if (results.length === 0) {
//       return new Response(
//         JSON.stringify({ message: "No tours found for this budget." }),
//         { status: 404 }
//       );
//     }

//     return new Response(JSON.stringify(results), { status: 200 });
//   } catch (error) {
//     console.error("Error fetching budget tours:", error);
//     return new Response(
//       JSON.stringify({ error: "Server error, please try again later." }),
//       { status: 500 }
//     );
//   }
// }


import dbConnect from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const { budget } = await req.json();

    // ✅ Validate input
    if (!budget || isNaN(budget)) {
      return new Response(
        JSON.stringify({ error: "Invalid budget" }),
        { status: 400 }
      );
    }

    // ✅ Connect to your collection properly
    const collection = await dbConnect("tourPackages");

    // ✅ Find tours within budget
    const results = await collection
      .find({ price: { $lte: Number(budget) } })
      .sort({ price: -1 })
      .limit(10)
      .toArray();

    if (!results || results.length === 0) {
      return new Response(
        JSON.stringify({ message: "No tours found for this budget." }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching budget tours:", error);
    return new Response(
      JSON.stringify({ error: "Server error, please try again later." }),
      { status: 500 }
    );
  }
}
