"use client";

import React from "react";

interface CheckoutLayoutProps {
  children: React.ReactNode;
}

const CheckoutLayout: React.FC<CheckoutLayoutProps> = ({ children }) => {
  return (
    <div className="flex-1 bg-[theme(--background)] py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[theme(--foreground)]">
            Checkout
          </h1>
          <p className="text-[theme(--muted-foreground)] mt-2">
            Review your order before payment
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default CheckoutLayout;
