// app/api/payments/hitpay/create-order-payment/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { serverApi } from "@/lib/axios/instance";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/app/types";

export async function POST(req: Request) {
    const cookie = await cookies()
    const token = cookie.get("token")?.value;

    if (!token) {
        return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
    }

    try {
        const body = await req.json();

        console.log('🔄 Proxying payment request to Express backend:', {
            amount: body.amount,
            email: body.email,
            purpose: body.purpose,
            itemCount: body.items?.length
        });

        const { data } = await serverApi.post("/payments/hitpay/create-order-payment", body, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log('✅ Express backend response:', {
            success: data.success,
            orderId: data.data?.order_id,
            paymentId: data.data?.payment_id
        });

        return NextResponse.json({
            success: true,
            data: data.data
        });

    } catch (error: unknown) {
        const axiosError = error as AxiosError<ApiErrorResponse>;

        console.error('❌ Proxy error:', axiosError.response?.data || axiosError.message);

        if (axiosError.response) {
            return NextResponse.json(
                {
                    success: false,
                    message: axiosError.response.data?.message || "Failed to create payment"
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