import { NextResponse } from "next/server";
import type { ApiErrorResponse } from "@/app/types";
import type { AxiosError } from "axios";
import type {
  HitPayCreatePaymentRequest,
  HitPayPaymentResponse,
  HitPayApiError
} from "@/app/types";

export async function POST(req: Request) {
  try {
    const body: HitPayCreatePaymentRequest = await req.json();
    const { amount, email, purpose, items } = body;

    // Validate required fields
    if (!amount || !email || !purpose) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: amount, email, purpose"
        },
        { status: 400 }
      );
    }

    // HitPay sandbox configuration
    const HITPAY_API_KEY = process.env.HITPAY_SANDBOX_API_KEY;
    const HITPAY_BASE_URL = process.env.HITPAY_SANDBOX_BASE_URL;
    const REDIRECT_URL = `${process.env.NEXTAUTH_URL}/payment/success`;
    const WEBHOOK_URL = `${process.env.NEXTAUTH_URL}/api/hitpay/webhook`;

    if (!HITPAY_API_KEY) {
      throw new Error("HitPay API key not configured");
    }

    console.log('🔄 Creating HitPay payment request:', {
      amount,
      email,
      purpose,
      redirect_url: REDIRECT_URL,
      webhook_url: WEBHOOK_URL
    });

    // Prepare form data for HitPay
    const formData = new URLSearchParams();
    formData.append('amount', amount.toFixed(2));
    formData.append('currency', 'PHP');
    formData.append('purpose', purpose);
    formData.append('redirect_url', REDIRECT_URL);
    formData.append('webhook', WEBHOOK_URL);
    formData.append('send_email', 'false');
    formData.append('email', email);
    formData.append('allowed_payment_methods[]', 'card');
    formData.append('allowed_payment_methods[]', 'paynow_online');

    const response = await fetch(
      `${HITPAY_BASE_URL}/v1/payment-requests`,
      {
        method: 'POST',
        headers: {
          'X-BUSINESS-API-KEY': HITPAY_API_KEY,
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      }
    );

    const data: HitPayPaymentResponse | HitPayApiError = await response.json();

    if (!response.ok) {
      const errorData = data as HitPayApiError;
      console.error('❌ HitPay API Error:', errorData);

      return NextResponse.json(
        {
          success: false,
          message: errorData.message || 'HitPay payment creation failed',
          code: errorData.code,
        },
        { status: response.status }
      );
    }

    const paymentData = data as HitPayPaymentResponse;
    console.log('✅ HitPay payment request created:', paymentData);

    return NextResponse.json({
      success: true,
      data: paymentData,
    });

  } catch (error: unknown) {
    console.error('❌ HitPay creation error:', error);

    // Handle Axios-style errors
    const axiosError = error as AxiosError<ApiErrorResponse>;
    if (axiosError.response) {
      return NextResponse.json(
        {
          success: false,
          message: axiosError.response.data?.message || "Failed to create HitPay payment"
        },
        { status: axiosError.response.status }
      );
    }

    // Handle generic errors
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}