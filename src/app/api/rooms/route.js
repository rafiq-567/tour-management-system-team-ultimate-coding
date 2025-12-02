import dbConnect from "@/lib/dbConnect";

export async function GET() {
  try {
    const roomsCollection = dbConnect("rooms");
    const rooms = await roomsCollection.find({}).toArray();


    return new Response(JSON.stringify(rooms), { status: 200 });
  } catch (error) {
    // console.error("Error fetching rooms:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch rooms" }), {
      status: 500,
    });
  }
}
