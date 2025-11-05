import React from "react";

interface OrderStatusBadgeProps {
  status: string;
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const getStatusConfig = (status: string) => {
    const configs: Record<string, { color: string; text: string }> = {
      pending_payment: { color: 'bg-orange-100 text-orange-800 border-orange-200', text: 'Pending Payment' },
      pending: { color: 'bg-gray-100 text-gray-800 border-gray-200', text: 'Pending' },
      processing: { color: 'bg-blue-100 text-blue-800 border-blue-200', text: 'Processing' },
      paid: { color: 'bg-green-100 text-green-800 border-green-200', text: 'Paid' },
      shipped: { color: 'bg-purple-100 text-purple-800 border-purple-200', text: 'Shipped' },
      delivered: { color: 'bg-green-100 text-green-800 border-green-200', text: 'Delivered' },
      cancelled: { color: 'bg-red-100 text-red-800 border-red-200', text: 'Cancelled' },
      refunded: { color: 'bg-gray-100 text-gray-800 border-gray-200', text: 'Refunded' }
    };
    
    return configs[status] || { color: 'bg-gray-100 text-gray-800 border-gray-200', text: status };
  };

  const config = getStatusConfig(status);

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
      {config.text}
    </span>
  );
};

export default OrderStatusBadge;