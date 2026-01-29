import { NextResponse } from "next/server";
import { serverApi } from "@/lib/axios/instance";
import type { ApiErrorResponse } from "@/app/types";
import type { AxiosError } from "axios";
// import { withCors, corsOptions } from "@/lib/cors";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        const res = await serverApi.post("/auth/login", { email, password });

        const token = res?.data?.data?.token;

        if (!token) {
            return NextResponse.json(
                { success: false, message: "No token returned" },
                { status: 401 }
            );
        }

        const response = NextResponse.json({
            success: true,
            data: { user: res?.data?.data.user }
        });

        // Set cookie with proper cross-origin settings
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax",
            path: "/",
        });

        return response
    } catch (error: unknown) {
        const axiosError = error as AxiosError<ApiErrorResponse>;

        if (axiosError.response) {
            const errorResponse = NextResponse.json(
                {
                    success: false,
                    message: axiosError.response.data?.message || "Login failed"
                },
                { status: axiosError.response.status }
            );
            return errorResponse
        }

        const errorResponse = NextResponse.json(
            { success: false, message: "Something went wrong" },
            { status: 500 }
        );
        return errorResponse
    }
}