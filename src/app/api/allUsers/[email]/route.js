import dbConnect from "@/lib/dbConnect";

export async function GET(req, {params}) {
    const {email} = await params;
    const collection = await dbConnect("user");
    const result = await collection.findOne({email});
    return Response.json(result);
}