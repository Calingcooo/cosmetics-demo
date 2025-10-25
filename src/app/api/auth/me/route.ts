import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { serverApi } from "@/lib/axios/instance";

export async function GET() {
    const cookie = await cookies()
    const token = cookie.get("token")?.value;

    if (!token) {
        return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
    }

    try {
        const { data } = await serverApi.get(`/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        
        return NextResponse.json({ success: true, user: data?.data?.user });
    } catch (error) {
        console.error("Me endpoint error:", error);
        return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }
}
