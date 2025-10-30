import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    // Handle preflight requests
    // if (req.method === 'OPTIONS') {
    //     const origin = req.headers.get('origin');
    //     // When using credentials, you CANNOT use wildcard '*'
    //     const allowOrigin = origin || 'https://50ed1a6423c118.lhr.life';

    //     return new NextResponse(null, {
    //         status: 200,
    //         headers: {
    //             'Access-Control-Allow-Origin': allowOrigin,
    //             'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
    //             'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    //             'Access-Control-Allow-Credentials': 'true',
    //             'Access-Control-Max-Age': '86400',
    //         },
    //     });
    // }

    // Your existing auth logic...
    const protectedRoutes = ["/account", "/orders", "/settings"];
    if (protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
        if (!token) {
            const loginUrl = new URL("/login", req.url);
            loginUrl.searchParams.set("from", req.nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    const response = NextResponse.next();
    // const origin = req.headers.get('origin');

    // When using credentials, you CANNOT use wildcard '*'
    // const allowOrigin = origin || 'https://d89286238b6fbd.lhr.life';

    // response.headers.set('Access-Control-Allow-Origin', allowOrigin);
    // response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    // response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    // response.headers.set('Access-Control-Allow-Credentials', 'true');

    return response;
}

export const config = {
    matcher: [
        "/api/:path*",
        "/account/:path*",
        "/account",
        "/orders/:path*",
        "/settings/:path*",
    ],
};