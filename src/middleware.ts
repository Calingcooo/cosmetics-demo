import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    // ✅ Define protected routes
    const protectedRoutes = ["/account", "/orders", "/settings"];

    // If user tries to access protected routes without a token → redirect to login
    if (protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
        if (!token) {
            const loginUrl = new URL("/login", req.url);
            loginUrl.searchParams.set("from", req.nextUrl.pathname); // optional: store return path
            return NextResponse.redirect(loginUrl);
        }
    }

    // If token exists or route is public, continue
    return NextResponse.next();
}

// ✅ Optional: limit middleware to specific routes for performance
export const config = {
    matcher: ["/account/:path*", "/account", "/orders/:path*", "/settings/:path*"],
};