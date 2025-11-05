// cart/components/CartLayout/CartLayout.tsx
import React from "react";

interface CartLayoutProps {
  children: React.ReactNode;
}

const CartLayout: React.FC<CartLayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[theme(--foreground)] mb-2">
          Shopping Cart
        </h1>
        <p className="text-[theme(--muted-foreground)]">
          Review your items and proceed to checkout
        </p>
      </div>

      {/* Content */}
      {children}
    </div>
  );
};

export default CartLayout;