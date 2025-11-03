// orders/components/OrdersLayout.tsx
import React from "react";

interface OrdersLayoutProps {
  children: React.ReactNode;
}

const OrdersLayout: React.FC<OrdersLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[theme(--background)] py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[theme(--foreground)]">My Orders</h1>
          <p className="text-[theme(--muted-foreground)] mt-2">
            View your order history and track your purchases
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default OrdersLayout;