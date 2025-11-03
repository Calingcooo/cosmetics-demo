// cart/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/hooks/cart/useCart";
import CartLayout from "./components/CartLayout";
import CartItemsList from "./components/CartItems/CartItemList";
import CartActions from "./components/CartActions/CartActions";
import { EmptyCart } from "./components/EmptyCart";
import CartPageSkeleton from "@/components/ui/loading/CartPageSkeleton";

export default function CartPage() {
  const { items, fetchUserCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  useEffect(() => {
    const loadCart = async () => {
      await fetchUserCart();
      setLoading(false);
    };
    loadCart();
  }, []);

  // Select all items by default when cart loads
  useEffect(() => {
    if (items.length > 0 && selectedItems.length === 0) {
      setSelectedItems(items.map((_, index) => index));
    }
  }, [items]);

  if (loading) {
    return <CartPageSkeleton />;
  }

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <CartLayout 
      itemCount={items.length} 
      selectedCount={selectedItems.length}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1">
        {/* Cart Items - Focus on management */}
        <div className="col-span-1 lg:col-span-3">
          <CartItemsList 
            items={items} 
            selectedItems={selectedItems}
            onSelectedItemsChange={setSelectedItems}
          />
        </div> 

        {/* Quick Actions Sidebar */}
        <div className="col-span-1">
          <CartActions 
            selectedItems={selectedItems}
            onSelectedItemsChange={setSelectedItems}
            items={items}
          />
        </div>
      </div>
    </CartLayout>
  );
}