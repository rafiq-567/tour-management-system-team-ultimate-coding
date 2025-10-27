import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";


const middleware = async (req) => {
    const token = await getToken({req});
    const routeUrl = await req.nextUrl.pathname;
    const result = routeUrl.startsWith("/dashboard")
    if ( result && !token ) {
        return  NextResponse.redirect(new URL(`/login`, req.nextUrl))
    }

    return NextResponse.next();
};

export default middleware;