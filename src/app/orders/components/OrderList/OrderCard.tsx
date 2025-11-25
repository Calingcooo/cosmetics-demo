// orders/components/OrderList/OrderCard.tsx
import React from "react";
import type { Order } from "@/app/types";
import OrderStatusBadge from "../OrderStatusBadge/OrderStatusBadge";

interface OrderCardProps {
  order: Order;
  onClick: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onClick }) => {
  const getLatestStatusDate = () => {
    if (order.delivered_at) return { date: order.delivered_at, action: 'Delivered' };
    if (order.shipped_at) return { date: order.shipped_at, action: 'Shipped' };
    if (order.paid_at) return { date: order.paid_at, action: 'Paid' };
    return { date: order.created_at, action: 'Ordered' };
  };

  const latestStatus = getLatestStatusDate();

  return (
    <div 
      className="bg-[theme(--card)] p-6 rounded-[theme(--radius)] shadow-[theme(--shadow-card)] border border-[theme(--border)] hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-[theme(--foreground)]">Order #{order.order_number}</h3>
          <p className="text-[theme(--muted-foreground)] text-sm">
            {latestStatus.action} • {new Date(latestStatus.date).toLocaleDateString()}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {/* Items Preview */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          {order.items.slice(0, 3).map((item, index) => (
            <div key={index} className="w-12 h-12 bg-[theme(--muted)] rounded-[theme(--radius)] flex items-center justify-center">
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
            <div className="w-12 h-12 bg-[theme(--muted)] rounded-[theme(--radius)] flex items-center justify-center">
              <span className="text-[theme(--muted-foreground)] text-xs">+{order.items.length - 3}</span>
            </div>
          )}
        </div>
        <p className="text-[theme(--muted-foreground)] text-sm">
          {order.items.length} item{order.items.length !== 1 ? 's' : ''} • ₱{order.total_amount}
        </p>
      </div>

      {/* Quick Status */}
      <div className="flex justify-between items-center text-sm">
        <span className="text-[theme(--muted-foreground)]">
          Payment: <span className="capitalize">{order.payment_status}</span>
        </span>
        <button className="text-[theme(--primary)] hover:text-[theme(--primary)]/80 font-medium">
          View Details →
        </button>
      </div>
    </div>
  );
};

export default OrderCard;