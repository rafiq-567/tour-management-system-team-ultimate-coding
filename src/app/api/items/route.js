
'use server'
import dbConnect from "@/lib/dbConnect";

export const dynamic = "force-static";
// tourPackeg data get api
export async function GET() {
  const data = await dbConnect("tourPackegdata").find().toArray();

  return Response.json({ data });
}
// tourpackeg add api 
export async function POST(req) {
  const postData = await req.json();
  const result = await dbConnect("tourPackegdata").insertOne(postData);

  return Response.json({ result});
 
}
// export async function GET() {
//   const data = await dbConnect("user").find().toArray();
//   return Response.json(data);
// }

// export async function GET() {
//   const data = await dbConnect("products").find().toArray();
//   return Response.json(data);

// }
