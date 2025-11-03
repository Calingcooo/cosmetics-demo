// cart/components/CartLayout.tsx
import React from "react";

interface CartLayoutProps {
  children: React.ReactNode;
  itemCount: number;
  selectedCount?: number;
}

const CartLayout: React.FC<CartLayoutProps> = ({ 
  children, 
  itemCount, 
  selectedCount 
}) => {
  return (
    <div className="flex-1 container mx-auto px-2 lg:px-4 py-8 flex flex-col">
      {/* Header with item count */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[theme(--foreground)]">
          Shopping Cart
        </h1>
        <p className="text-[theme(--muted-foreground)] mt-2">
          {selectedCount !== undefined ? `${selectedCount} of ${itemCount}` : itemCount} 
          {itemCount === 1 ? ' item' : ' items'} in your cart
        </p>
      </div>

      {children}
    </div>
  );
};

export default CartLayout;