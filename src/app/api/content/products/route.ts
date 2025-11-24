import { NextResponse } from "next/server";
import { serverApi } from "@/lib/axios/instance";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/app/types";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const page = searchParams.get("page") || "1";
        const limit = 8
        const category = searchParams.get("category") || "";

        const res = await serverApi.get(`/products/all?page=${page}&limit=${limit}&category=${category}`)

        const response = NextResponse.json({
            success: true,
            data: { products: res?.data?.data.products, currentPage: res?.data?.data.currentPage, total: res?.data?.data.total, totalPages: res?.data?.data.totalPages }
        });

        return response
    } catch (error: unknown) {
        const axiosError = error as AxiosError<ApiErrorResponse>;

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
