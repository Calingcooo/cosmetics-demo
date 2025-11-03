import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { serverApi } from "@/lib/axios/instance";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/app/types";

export async function GET() {
    const cookie = await cookies()
    const token = cookie.get("token")?.value;

    console.log(token)

    if (!token) {
        return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
    }

    try {
        const { data } = await serverApi.get("/orders", {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log("Orders data:", data);

        const response = NextResponse.json({
            success: true,
            data: data.data
        });

        return response;

    } catch (error: unknown) {
        const axiosError = error as AxiosError<ApiErrorResponse>;

        if (axiosError.response) {
            return NextResponse.json(
                {
                    success: false,
                    message: axiosError.response.data?.message || "Failed to fetch orders"
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