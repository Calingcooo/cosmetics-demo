import React from "react";
import type { User, CartItem } from "@/app/types";
import OrderItems from "./OrderItems";
import PriceBreakdown from "./PriceBreakdown";
import CheckoutButton from "../CheckoutActions/CheckoutButton";
import ProfileRedirect from "../CheckoutActions/ProfileRedirect";
import { isAddressComplete } from "@/lib/helpers/address.helper";
import Link from "next/link";

interface OrderSummaryProps {
  user: User | null;
  items: CartItem[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ user, items }) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price_at_add * item.quantity,
    0
  );

  const shippingCost = 0;
  const taxAmount = subtotal * 0.12;
  const total = subtotal + shippingCost + taxAmount;

  const hasCompleteAddress = user ? isAddressComplete(user) : false;

  return (
    <div className="sticky top-8 space-y-6">
      {/* Order Items */}
      <OrderItems items={items} />

      {/* Price Breakdown */}
      <PriceBreakdown
        subtotal={subtotal}
        shippingCost={shippingCost}
        taxAmount={taxAmount}
        total={total}
      />

      {/* Checkout Actions */}
      <div className="space-y-4">
        {hasCompleteAddress ? (
          <CheckoutButton items={items} totalAmount={total} user={user} />
        ) : (
          <ProfileRedirect />
        )}

        {/* Cancel/Back to Cart Button */}
        <Link
          href="/cart"
          className="w-full block text-center py-3 px-4 border border-[theme(--border)] bg-[theme(--card)] text-[theme(--foreground)] rounded-[theme(--radius)] font-medium hover:bg-[theme(--muted)] transition-colors"
        >
          ← Back to Cart
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
