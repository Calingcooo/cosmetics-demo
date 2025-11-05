// cart/page.tsx
"use client";

import React from "react";
import { useCart } from "@/lib/hooks/cart/useCart";
import CartLayout from "./components/CartLayout";
import CartItemsList from "./components/CartItems/CartItemList";
import CartActions from "./components/CartActions/CartActions";
import { EmptyCart } from "./components/EmptyCart";
import CartPageSkeleton from "@/components/ui/loading/CartPageSkeleton";

const CartPage: React.FC = () => {
  const { items, selectedItems, loading, error } = useCart();

  // Function to generate checkout URL with selected items
  const getCheckoutUrl = () => {
    if (selectedItems.length === 0) return "/checkout";

    // Create a unique identifier for each selected item
    const selectedIds = selectedItems.map(
      (item) => `${item.id}-${JSON.stringify(item.selected_variations)}`
    );

    return `/checkout?selected=${encodeURIComponent(selectedIds.join(","))}`;
  };

  if (loading) {
    return <CartPageSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">
          <p>Error loading cart: {error}</p>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <CartLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <CartItemsList />
        </div>

        {/* Cart Actions */}
        <div className="lg:col-span-1">
          <CartActions checkoutUrl={getCheckoutUrl()}/>
        </div>
      </div>
    </CartLayout>
  );
};

export default CartPage;
