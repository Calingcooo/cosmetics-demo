// app/payments/success/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("loading");

  // HitPay sends these parameters after payment
  const orderId = searchParams.get("order_id");
  const reference = searchParams.get("reference");
  // const paymentStatus = searchParams.get("status");
  // const paymentId = searchParams.get("id");

  useEffect(() => {
    // If we have an order ID, consider it successful for now
    // The webhook will update the actual status in the background
    if (orderId || reference) {
      setStatus("success");
      // Clear cart data
      sessionStorage.removeItem("hitpay_checkout_data");
      localStorage.removeItem("cart"); // If you use localStorage
    } else {
      setStatus("error");
    }
  }, [orderId, reference]);

  return (
    <div className="flex-1 bg-[theme(--background)] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[theme(--card)] rounded-lg border border-[theme(--border)]/40 shadow-lg p-6 text-center">
        {status === "loading" && (
          <>
            <div className="w-16 h-16 border-4 border-[theme(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-[theme(--foreground)] mb-2">
              Processing Payment...
            </h1>
            <p className="text-[theme(--muted-foreground)]">
              Please wait while we process your payment.
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
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[theme(--foreground)] mb-2">
              Thank You for Your Order!
            </h1>
            <p className="text-[theme(--muted-foreground)] mb-4">
              Your payment is being processed. You will receive a confirmation
              email shortly.
            </p>

            {(orderId || reference) && (
              <div className="bg-[theme(--accent)] text-[theme(--accent-foreground)] rounded-lg p-3 mb-4 text-sm">
                <p className="font-medium">
                  Order Reference: {orderId || reference}
                </p>
                <p className="text-xs mt-1">
                  Check your orders page for updates
                </p>
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
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[theme(--foreground)] mb-2">
              Payment Issue
            </h1>
            <p className="text-[theme(--muted-foreground)] mb-4">
              There was an issue with your payment. Please check your orders or
              try again.
            </p>
            <div className="space-y-3">
              <Link
                href="/orders"
                className="block w-full bg-[theme(--primary)] text-[theme(--primary-foreground)] py-2 px-4 rounded-md hover:bg-[theme(--primary)]/90 transition-colors font-medium"
              >
                Check Orders
              </Link>
              <Link
                href="/cart"
                className="block w-full border border-[theme(--input)] bg-[theme(--background)] text-[theme(--foreground)] py-2 px-4 rounded-md hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)] transition-colors font-medium"
              >
                Return to Cart
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
