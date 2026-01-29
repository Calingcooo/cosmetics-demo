import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

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