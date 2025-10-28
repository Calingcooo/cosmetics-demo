import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { serverApi } from "@/lib/axios/instance";
import type { AxiosError } from "axios";
import type { ApiResponse, ApiErrorResponse } from "@/app/types";
import type { CartItem } from "@/app/types";

export async function POST(req: Request) {
    const cookie = await cookies()
    const token = cookie.get("token")?.value;

    if (!token) {
        return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
    }

    try {
        const body = await req.json()        

        const { data } = await serverApi.post("/cart/add", body, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        const response = NextResponse.json({
            success: true,
            data: { cart: data?.data.cart.items }
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
