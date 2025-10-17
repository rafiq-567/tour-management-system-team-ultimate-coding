import dbConnect from "@/lib/dbConnect";

export async function GET() {
  try {
    const tours = dbConnect("tours");

    const sampleData = [
      { name: "Cox's Bazar Beach Trip", location: "Cox's Bazar", price: 12000, duration: "3 Days" },
      { name: "Sajek Valley Adventure", location: "Sajek", price: 8000, duration: "2 Days" },
      { name: "Sundarban Wildlife Tour", location: "Sundarban", price: 15000, duration: "3 Days" },
      { name: "Sylhet Tea Garden Visit", location: "Sylhet", price: 5000, duration: "1 Day" },
    ];

    await tours.insertMany(sampleData);

    return new Response(JSON.stringify({ message: "Seeded sample tours successfully!" }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Seeding failed" }), { status: 500 });
  }
}
