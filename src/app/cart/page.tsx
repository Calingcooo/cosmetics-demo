"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/hooks/cart/useCart";
import { CartItem } from "./components/CartItem";
import { CartSummary } from "./components/CartSummary";
import { EmptyCart } from "./components/EmptyCart";
import CartPageSkeleton from "@/components/ui/loading/CartPageSkeleton";

export default function CartPage() {
  const { items, fetchUserCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      await fetchUserCart();
      setLoading(false);
    };
    loadCart();
  }, []);

  if (loading) {
    return <CartPageSkeleton />;
  }

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="flex-1 container mx-auto px-2 lg:px-4 py-8 flex flex-col">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        {/* Cart Items */}
        <div className="col-span-1 lg:col-span-2 space-y-4">
          {items.map((item, index) => (
            <CartItem key={`${item.id}-${index}`} item={item} index={index} />
          ))}
        </div> 

        {/* Order Summary */}
        <CartSummary />
      </div>
    </div>
  );
}
