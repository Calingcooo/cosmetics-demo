// orders/components/OrderDetails/OrderDetails.tsx
import React from "react";
import type { Order } from "@/app/types";
import OrderItems from "../OrderDetails/OrderItems";
import OrderTimeline from "../OrderTimeline/OrderTimeline";

interface OrderDetailsProps {
  order: Order;
  onClose: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onClose }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-[theme(--foreground)]">
            Order #{order.order_number}
          </h2>
          <p className="text-[theme(--muted-foreground)] mt-1">
            Placed on {new Date(order.created_at).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-[theme(--muted)] rounded-[theme(--radius)] transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <OrderItems items={order.items} />
          
          {/* Price Breakdown */}
          <div className="bg-[theme(--card)] p-6 rounded-[theme(--radius)] shadow-[theme(--shadow-card)] border border-[theme(--border)]">
            <h3 className="text-lg font-semibold text-[theme(--foreground)] mb-4">
              Price Breakdown
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[theme(--muted-foreground)]">Subtotal</span>
                <span className="text-[theme(--foreground)]">
                  ₱{(Number(order.total_amount) - Number(order.shipping_cost || 0) - Number(order.tax_amount || 0)).toFixed(2)}
                </span>
              </div>
              {order.shipping_cost && Number(order.shipping_cost) > 0 && (
                <div className="flex justify-between">
                  <span className="text-[theme(--muted-foreground)]">Shipping</span>
                  <span className="text-[theme(--foreground)]">₱{order.shipping_cost}</span>
                </div>
              )}
              {order.tax_amount && Number(order.tax_amount) > 0 && (
                <div className="flex justify-between">
                  <span className="text-[theme(--muted-foreground)]">Tax</span>
                  <span className="text-[theme(--foreground)]">₱{order.tax_amount}</span>
                </div>
              )}
              <div className="border-t border-[theme(--border)] pt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-[theme(--foreground)]">Total</span>
                  <span className="text-[theme(--primary)]">₱{order.total_amount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <OrderTimeline order={order} />
          
          {/* Payment Status */}
          <div className="bg-[theme(--card)] p-6 rounded-[theme(--radius)] shadow-[theme(--shadow-card)] border border-[theme(--border)]">
            <h3 className="text-lg font-semibold text-[theme(--foreground)] mb-4">
              Payment Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[theme(--muted-foreground)]">Status</span>
                <span className={`font-medium capitalize ${
                  order.payment_status === 'completed' ? 'text-green-600' : 
                  order.payment_status === 'pending' ? 'text-yellow-600' : 
                  'text-red-600'
                }`}>
                  {order.payment_status}
                </span>
              </div>
              {order.paid_at && (
                <div className="flex justify-between">
                  <span className="text-[theme(--muted-foreground)]">Paid On</span>
                  <span className="text-[theme(--foreground)]">
                    {new Date(order.paid_at).toLocaleDateString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[theme(--muted-foreground)]">Total Paid</span>
                <span className="text-[theme(--foreground)] font-semibold">
                  ₱{order.paid_amount || order.total_amount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;