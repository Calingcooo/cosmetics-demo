// app/payment/success/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("loading");

  const paymentId = searchParams.get("payment_id");
  const paymentRequestId = searchParams.get("payment_request_id");

  useEffect(() => {
    if (paymentId && paymentRequestId) {
      setStatus("success");
      // Clear cart data
      sessionStorage.removeItem("hitpay_checkout_data");
    } else {
      setStatus("error");
    }
  }, [paymentId, paymentRequestId]);

  return (
    <div className="flex-1 bg-[theme(--background)] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[theme(--card)] rounded-lg border border-[theme(--border)]/40 shadow-lg p-6 text-center">
        {status === "loading" && (
          <>
            <div className="w-16 h-16 border-4 border-[theme(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-[theme(--foreground)] mb-2">
              Verifying Payment...
            </h1>
            <p className="text-[theme(--muted-foreground)]">
              Please wait while we confirm your payment.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[theme(--foreground)] mb-2">
              Payment Successful!
            </h1>
            <p className="text-[theme(--muted-foreground)] mb-4">
              Thank you for your purchase. Your order has been confirmed.
            </p>
            {paymentId && (
              <div className="bg-[theme(--accent)] text-[theme(--accent-foreground)] rounded-lg p-3 mb-4 text-sm">
                <p className="font-medium">Payment ID: {paymentId}</p>
              </div>
            )}
            <div className="space-y-3">
              <Link
                href="/orders"
                className="block w-full bg-[theme(--primary)] text-[theme(--primary-foreground)] py-2 px-4 rounded-md hover:bg-[theme(--primary)]/90 transition-colors font-medium"
              >
                View Orders
              </Link>
              <Link
                href="/products"
                className="block w-full border border-[theme(--input)] bg-[theme(--background)] text-[theme(--foreground)] py-2 px-4 rounded-md hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)] transition-colors font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[theme(--foreground)] mb-2">
              Payment Failed
            </h1>
            <p className="text-[theme(--muted-foreground)] mb-4">
              There was an issue processing your payment. Please try again.
            </p>
            <div className="space-y-3">
              <Link
                href="/cart"
                className="block w-full bg-[theme(--primary)] text-[theme(--primary-foreground)] py-2 px-4 rounded-md hover:bg-[theme(--primary)]/90 transition-colors font-medium"
              >
                Return to Cart
              </Link>
              <Link
                href="/products"
                className="block w-full border border-[theme(--input)] bg-[theme(--background)] text-[theme(--foreground)] py-2 px-4 rounded-md hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)] transition-colors font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
