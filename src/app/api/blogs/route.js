import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";




export async function GET() {
  try {
   
    const db = await dbConnect('blogs')
    const blogs = await db.find({}).toArray();
  

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to load blogs" }, { status: 500 });
  }
}

// post blog api 

export async function POST(req) {
  try {
    const body = await req.json();
 
    const db = dbConnect("blogs")
    const newBlog = {
      ...body,
      date: new Date(),
    };
    await db.insertOne(newBlog);
    return NextResponse.json({ message: "Blog added successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } 
}
