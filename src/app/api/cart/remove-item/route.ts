import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { serverApi } from "@/lib/axios/instance";
import type { AxiosError } from "axios";
import type { ApiResponse, ApiErrorResponse, Cart } from "@/app/types";

export async function POST(req: Request) {
    const cookie = await cookies()
    const token = cookie.get("token")?.value;

    if (!token) {
        return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
    }

    try {
        const body = await req.json()
        console.log(body)
        const { data } = await serverApi.post<ApiResponse<{ cart: Cart }>>("/cart/remove-item", body, {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log(data)

        const response = NextResponse.json({
            success: true,
            data: { cart: data.data.cart }
        });
        return response
    } catch (error: unknown) {
        const axiosError = error as AxiosError<ApiErrorResponse>;

        if (axiosError.response) {
            return NextResponse.json(
                {
                    success: false,
                    message: axiosError.response.data?.message || "Failed to remove item from cart"
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