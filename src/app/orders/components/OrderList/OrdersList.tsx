// orders/components/OrdersList/OrdersList.tsx
import React from "react";
import type { Order } from "@/app/types";
import OrderCard from "./OrderCard";

interface OrdersListProps {
  orders: Order[];
  loading: boolean;
  onOrderClick: (order: Order) => void;
}

const OrdersList: React.FC<OrdersListProps> = ({ orders, loading, onOrderClick }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-[theme(--card)] p-6 rounded-[theme(--radius)] shadow-[theme(--shadow-card)] border border-[theme(--border)] animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <div className="h-4 bg-[theme(--muted)] rounded w-32"></div>
                <div className="h-3 bg-[theme(--muted)] rounded w-24"></div>
              </div>
              <div className="h-6 bg-[theme(--muted)] rounded w-20"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-[theme(--muted)] rounded w-full"></div>
              <div className="h-3 bg-[theme(--muted)] rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-[theme(--muted-foreground)] mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-[theme(--foreground)] mb-2">No orders yet</h3>
        <p className="text-[theme(--muted-foreground)]">When you place orders, they will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onClick={() => onOrderClick(order)}
        />
      ))}
    </div>
  );
};

export default OrdersList;