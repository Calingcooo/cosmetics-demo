// orders/components/OrdersList/OrderCard.tsx
import React from "react";
import { Order } from "@/app/types";
import OrderStatusBadge from "./OrderStatusBadge";

interface OrderCardProps {
  order: Order;
  isSelected: boolean;
  onSelect: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, isSelected, onSelect }) => {
  const orderDate = new Date(order.created_at).toLocaleDateString();
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      onClick={onSelect}
      className={`p-4 border rounded-[theme(--radius)] cursor-pointer transition-[theme(--transition-smooth)] ${
        isSelected
          ? "border-[theme(--primary)] bg-[theme(--primary)]/5 shadow-[theme(--shadow-soft)]"
          : "border-[theme(--border)] bg-[theme(--card)] hover:shadow-[theme(--shadow-soft)] hover:border-[theme(--primary)]/30"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-[theme(--foreground)]">
            Order #{order.order_number}
          </h3>
          <p className="text-[theme(--muted-foreground)] text-sm">
            {orderDate} • {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {order.items.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="w-8 h-8 bg-[theme(--muted)] rounded-[theme(--radius)] flex items-center justify-center"
            >
              {item.product_image ? (
                <img
                  src={item.product_image}
                  alt={item.product_name}
                  className="w-full h-full object-cover rounded-[theme(--radius)]"
                />
              ) : (
                <span className="text-[theme(--muted-foreground)] text-xs">📦</span>
              )}
            </div>
          ))}
          {order.items.length > 3 && (
            <span className="text-[theme(--muted-foreground)] text-xs">
              +{order.items.length - 3} more
            </span>
          )}
        </div>

        <div className="text-right">
          <p className="font-semibold text-[theme(--foreground)]">
            ₱{order.total_amount}
          </p>
          <p className="text-[theme(--muted-foreground)] text-xs capitalize">
            {order.payment_status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;