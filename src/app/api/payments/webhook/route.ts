// app/api/hitpay/webhook/route.ts
import { NextResponse } from "next/server";
import { serverApi } from "@/lib/axios/instance";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/app/types";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const signature = req.headers.get('x-signature');

        console.log('🔵 [NEXTJS] HitPay Webhook Received');
        console.log('🔵 [NEXTJS] Full webhook data:', JSON.stringify(body, null, 2));
        console.log('🔵 [NEXTJS] Headers:', {
            signature: signature,
            'content-type': req.headers.get('content-type'),
            'user-agent': req.headers.get('user-agent')
        });

        // Log the exact data we're sending to Express
        console.log('🔵 [NEXTJS] Proxying to Express backend with data:', {
            payment_id: body.id,
            status: body.status,
            reference_number: body.reference_number,
            payment_request_id: body.payment_request_id
        });

        const expressBackendUrl = process.env.EXPRESS_BACKEND_URL || 'http://localhost:8000';
        console.log('🔵 [NEXTJS] Sending to Express backend:', `${expressBackendUrl}/api/payments/hitpay/webhook`);

        const response = await serverApi.post("/payments/hitpay/webhook", body, {
            headers: {
                ...(signature && { 'x-signature': signature }),
                'Content-Type': 'application/json'
            }
        });

        console.log('🟢 [NEXTJS] Webhook successfully proxied to Express');
        console.log('🟢 [NEXTJS] Express response:', response.data);

        return NextResponse.json({
            success: true,
            data: response.data
        });

    } catch (error: unknown) {
        const axiosError = error as AxiosError<ApiErrorResponse>;

        console.error('🔴 [NEXTJS] Webhook proxy ERROR:');
        console.error('🔴 [NEXTJS] Error message:', axiosError.message);
        console.error('🔴 [NEXTJS] Error response:', axiosError.response?.data);
        console.error('🔴 [NEXTJS] Error status:', axiosError.response?.status);
        console.error('🔴 [NEXTJS] Error config:', axiosError.config?.url);

        if (axiosError.response) {
            return NextResponse.json(
                {
                    success: false,
                    message: axiosError.response.data?.message || "Failed to process webhook"
                },
                { status: axiosError.response.status }
            );
        }

        return NextResponse.json(
            { success: false, message: "Webhook processing failed" },
            { status: 500 }
        );
    }
}