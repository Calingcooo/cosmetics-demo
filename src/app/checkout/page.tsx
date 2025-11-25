import React, { Suspense } from "react";
import CheckoutLayout from "./components/CheckoutLayout";
import CheckoutContent from "./components/CheckoutContent";

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutLayout>
        <CheckoutContent />
      </CheckoutLayout>
    </Suspense>
  );
}