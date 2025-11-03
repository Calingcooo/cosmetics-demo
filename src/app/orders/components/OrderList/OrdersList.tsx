import React from "react";
import type { Order } from "@/app/types";
import OrderCard from "./OrderCard";

interface OrdersListProps {
  orders: Order[];
  selectedOrder: Order | null;
  onSelectOrder: (order: Order) => void;
}

const OrdersList: React.FC<OrdersListProps> = ({
  orders,
  selectedOrder,
  onSelectOrder,
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-[theme(--card)] p-6 rounded-[theme(--radius)] shadow-[theme(--shadow-card)] border border-[theme(--border)]">
        <h2 className="text-xl font-semibold text-[theme(--foreground)] mb-4">
          Order History
        </h2>
        
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              isSelected={selectedOrder?.id === order.id}
              onSelect={() => onSelectOrder(order)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersList;