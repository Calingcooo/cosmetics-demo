// app/api/hitpay/webhook/route.ts
import { NextResponse } from "next/server";
import { serverApi } from "@/lib/axios/instance";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/app/types";

export async function POST(req: Request) {
    try {
        // Get the content type to determine how to parse the body
        const contentType = req.headers.get('content-type') || '';
        const signature = req.headers.get('x-signature');

        let body: any;

        if (contentType.includes('application/x-www-form-urlencoded')) {
            // Handle form data from HitPay
            const rawBody = await req.text();
            console.log('🔵 [NEXTJS] Raw form data:', rawBody);

            // Parse URL-encoded form data
            const params = new URLSearchParams(rawBody);
            body = Object.fromEntries(params.entries());
        } else if (contentType.includes('application/json')) {
            // Handle JSON data
            body = await req.json();
        } else {
            // Fallback: try to get raw text
            const rawBody = await req.text();

            // Try to parse as form data first, then as JSON
            try {
                const params = new URLSearchParams(rawBody);
                body = Object.fromEntries(params.entries());
            } catch {
                try {
                    body = JSON.parse(rawBody);
                } catch {
                    body = { raw: rawBody };
                }
            }
        }

        console.log('🔵 [NEXTJS] Headers:', {
            signature: signature,
            'content-type': contentType,
            'user-agent': req.headers.get('user-agent')
        });

        // Send to Express backend - make sure it's sending as form data if that's what HitPay sends
        const response = await serverApi.post("/payments/hitpay/webhook", body, {
            headers: {
                ...(signature && { 'x-signature': signature }),
                'Content-Type': 'application/json' // Keep as JSON since we're parsing it properly now
            }
        });

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