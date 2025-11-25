import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken"

import { serverApi } from "@/lib/axios/instance";
import type { ApiErrorResponse } from "@/app/types";
import type { AxiosError } from "axios";

interface CustomJWTPayload extends JwtPayload {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    cart_count: number;
}

export async function GET() {
    const cookie = await cookies()
    const token = cookie.get("token")?.value;

    if (!token) {
        return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret") as CustomJWTPayload;

        const res = await serverApi.get("/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
        })

        return NextResponse.json({ success: true, user: res?.data?.data.user });
    } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;

        if (error instanceof TokenExpiredError) {
            return NextResponse.json(
                { success: false, message: "Token expired. Please login again." },
                { status: 401 }
            );
        }

        if (axiosError.response) {
            return NextResponse.json(
                {
                    success: false,
                    message: axiosError.response.data?.message || "Failed to fetch all products"
                },
                { status: axiosError.response.status }
            );
        }

        return NextResponse.json(
            { success: false, message: "Something went wrong" },
            { status: 500 }
        );
    }
}
