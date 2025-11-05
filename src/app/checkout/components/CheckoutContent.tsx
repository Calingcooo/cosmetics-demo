// checkout/components/CheckoutContent/CheckoutContent.tsx
"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/lib/hooks/user/useUser";
import { useCart } from "@/lib/hooks/cart/useCart";
import CustomerInfo from "./CustomerInfo/CustomerInfo";
import OrderSummary from "./OrderSummary/OrderSummary";
import CheckouPageSkeleton from "@/components/ui/loading/CheckouPageSkeleton";

const CheckoutContent: React.FC = () => {
  const searchParams = useSearchParams();
  const { user, isLoading: userLoading } = useUser();
  const { items, loading: cartLoading } = useCart();

  // Get selected items from URL parameters
  const getSelectedItemsFromUrl = () => {
    const selectedParam = searchParams.get("selected");
    if (!selectedParam) return items; // Fallback to all items if no selection

    try {
      const selectedIds = decodeURIComponent(selectedParam).split(",");

      return items.filter((item) => {
        const itemIdentifier = `${item.id}-${JSON.stringify(
          item.selected_variations
        )}`;
        return selectedIds.includes(itemIdentifier);
      });
    } catch (error) {
      console.error("Error parsing selected items from URL:", error);
      return items; // Fallback to all items
    }
  };

  const checkoutItems = getSelectedItemsFromUrl();

  if (userLoading || cartLoading) {
    return <CheckouPageSkeleton />;
  }

  // Handle case where no items are available for checkout
  if (!checkoutItems || checkoutItems.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-bold text-[theme(--foreground)] mb-4">
          No Items to Checkout
        </h2>
        <p className="text-[theme(--muted-foreground)] mb-6">
          {items.length === 0
            ? "Your cart is empty. Add some items before checking out."
            : "The selected items are no longer available in your cart."}
        </p>
        <a
          href="/cart"
          className="bg-[theme(--primary)] text-white px-6 py-2 rounded-[theme(--radius)] hover:bg-[theme(--primary-hover)] transition-colors"
        >
          Return to Cart
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Order Details */}
      <div className="lg:col-span-2 space-y-6">
        <CustomerInfo user={user} />
      </div>

      {/* Order Summary - Pass the filtered items */}
      <div className="space-y-6">
        <OrderSummary user={user} items={checkoutItems} />
      </div>
    </div>
  );
};

export default CheckoutContent;
