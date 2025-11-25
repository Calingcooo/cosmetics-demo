// orders/components/OrdersList/OrderStatusBadge.tsx
import React from "react";

interface OrderStatusBadgeProps {
  status: string;
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const getStatusConfig = (status: string) => {
    const config = {
      pending: {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        label: "Pending"
      },
      processing: {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        label: "Processing"
      },
      paid: {
        color: "bg-green-100 text-green-800 border-green-200",
        label: "Paid"
      },
      shipped: {
        color: "bg-purple-100 text-purple-800 border-purple-200",
        label: "Shipped"
      },
      delivered: {
        color: "bg-green-100 text-green-800 border-green-200",
        label: "Delivered"
      },
      cancelled: {
        color: "bg-red-100 text-red-800 border-red-200",
        label: "Cancelled"
      },
      refunded: {
        color: "bg-gray-100 text-gray-800 border-gray-200",
        label: "Refunded"
      }
    };

    return config[status as keyof typeof config] || config.pending;
  };

  const { color, label } = getStatusConfig(status);

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${color}`}>
      {label}
    </span>
  );
};

export default OrderStatusBadge;