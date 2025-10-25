import { NextResponse } from "next/server";
import { serverApi } from "@/lib/axios/instance";
import type { AxiosError } from "axios";

export async function GET(req: Request) {
    try {
        const res = await serverApi.get("/category/all")

        const response = NextResponse.json({
            success: true,
            categories: res?.data?.data.categories,
        });

        return response
    } catch (error: unknown) {
        const axiosError = error as AxiosError<any>;

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
