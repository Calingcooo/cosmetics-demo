import { NextResponse } from "next/server";
import type { HitPayWebhookData } from "@/app/types";

export async function POST(req: Request) {
    try {
        const webhookData: HitPayWebhookData = await req.json();

        console.log('📩 HitPay Webhook Received:', webhookData);

        // Verify webhook signature (important for security)
        const signature = req.headers.get('X-Signature');
        // Implement signature verification logic here

        // Process the webhook based on payment status
        switch (webhookData.status) {
            case 'completed':
                // Update your database: mark order as paid
                console.log('✅ Payment completed:', webhookData.payment_id);
                // await updateOrderStatus(webhookData.payment_request_id, 'paid');
                break;

            case 'failed':
                // Update your database: mark order as failed
                console.log('❌ Payment failed:', webhookData.payment_id);
                // await updateOrderStatus(webhookData.payment_request_id, 'failed');
                break;

            case 'pending':
                // Payment is still pending
                console.log('⏳ Payment pending:', webhookData.payment_id);
                break;

            default:
                console.log('ℹ️ Unknown payment status:', webhookData.status);
        }

        return NextResponse.json({
            success: true,
            message: 'Webhook processed successfully'
        });

    } catch (error: unknown) {
        console.error('❌ Webhook processing error:', error);

        if (error instanceof Error) {
            return NextResponse.json(
                { success: false, message: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: false, message: "Webhook processing failed" },
            { status: 500 }
        );
    }
}