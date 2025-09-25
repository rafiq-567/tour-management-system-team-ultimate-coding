import dbConnect from "@/lib/dbConnect";


export async function GET() {
  const data = await dbConnect("user").find().toArray();
  return Response.json(data);
}
