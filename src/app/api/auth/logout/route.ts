import { NextResponse } from "next/server";
import type { ApiErrorResponse } from "@/app/types";
import type { AxiosError } from "axios";

export async function POST() {
    try {
        const response = NextResponse.json({
            success: true,
            message: "Logged out successfully",
        });

        // Clear the 'token' cookie
        response.cookies.set({
            name: "token",
            value: "",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            expires: new Date(0),
        });

        return response;
    } catch (error: unknown) {
        const axiosError = error as AxiosError<ApiErrorResponse>;

        if (axiosError.response) {
            return NextResponse.json(
                {
                    success: false,
                    message: axiosError.response.data?.message || "Login failed"
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