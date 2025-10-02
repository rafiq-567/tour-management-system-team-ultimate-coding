import dbConnect from "@/lib/dbConnect";

export async function GET(req, {params}) {
    const {email} = await params;
    const result = await dbConnect("user").findOne({email});
    return Response.json(result);
}