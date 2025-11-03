// orders/components/OrdersContent.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useOrders } from "../../../lib/hooks/order/useOrders";
import OrdersList from "./OrderList/OrdersList";
import OrderDetails from "./OrderDetails/OrderDetails,";
import OrdersLoading from "./LoadingStates/OrdersLoading";

const OrdersContent: React.FC = () => {
  const { orders, getOrders, loading, error } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    getOrders()
  }, [])

  if (loading) {
    return <OrdersLoading />;
  }

  if (error) {
    return (
      <div className="bg-[theme(--destructive)]/10 border border-[theme(--destructive)]/20 rounded-[theme(--radius)] p-6 text-center">
        <p className="text-[theme(--destructive)] font-medium">
          Failed to load orders
        </p>
        <p className="text-[theme(--muted-foreground)] text-sm mt-2">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-[theme(--card)] p-8 rounded-[theme(--radius)] shadow-[theme(--shadow-card)] border border-[theme(--border)] text-center">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-[theme(--foreground)] mb-2">
            No Orders Yet
          </h3>
          <p className="text-[theme(--muted-foreground)] mb-6">
            Start shopping to see your orders here
          </p>
          <a
            href="/products"
            className="inline-flex items-center justify-center bg-[theme(--primary)] text-[theme(--primary-foreground)] px-6 py-3 rounded-[theme(--radius)] font-medium hover:bg-[theme(--primary-hover)] transition-colors"
          >
            Start Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Orders List */}
      <div className="lg:col-span-2">
        <OrdersList
          orders={orders}
          selectedOrder={selectedOrder}
          onSelectOrder={setSelectedOrder}
        />
      </div>

      {/* Order Details Sidebar */}
      <div className="lg:col-span-1">
        <OrderDetails
          order={selectedOrder || orders[0]}
          onClose={() => setSelectedOrder(null)}
        />
      </div>
    </div>
  );
};

export default OrdersContent;
