import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { withCors, corsOptions } from "@/lib/cors";

export async function GET(req: Request) {
    const cookie = await cookies()
    const token = cookie.get("token")?.value;

    console.log('🍪 Debug - All cookies:', cookies);
    console.log('🔑 Debug - Token cookie:', token ? '***' + token.slice(-10) : 'MISSING');

    const response = NextResponse.json({
        success: true,
        hasToken: !!token,
        tokenPresent: !!token,
        tokenPreview: token ? '***' + token.slice(-10) : null,
        allCookies: cookies,
        headers: {
            origin: req.headers.get('origin'),
            cookie: req.headers.get('cookie')
        }
    });

    return withCors(response, req);
}

export async function OPTIONS(req: Request) {
    return corsOptions(req);
}