import dbConnect from "@/lib/dbConnect";


export async function GET() {
  const data = await dbConnect("products").find().toArray();
  return Response.json(data);
}
