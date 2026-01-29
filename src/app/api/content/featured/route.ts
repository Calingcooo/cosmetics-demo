import { NextResponse } from "next/server";
import { serverApi } from "@/lib/axios/instance";
import type { ApiErrorResponse } from "@/app/types";
import type { AxiosError } from "axios";

export async function GET() {
    try {
        const res = await serverApi.get("/products/featured");
        
        const response = NextResponse.json({
            success: true,
            data: res.data.data
        });
        
        return response;
    } catch (error: unknown) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        console.error("❌ Featured products error:", axiosError.response?.data);

        if (axiosError.response) {
            return NextResponse.json(
                {
                    success: false,
                    message: axiosError.response.data?.message || "Failed to fetch featured products"
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