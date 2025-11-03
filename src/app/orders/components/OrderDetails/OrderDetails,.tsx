// orders/components/OrderDetails/OrderDetails.tsx
import React from "react";
import { Order } from "@/app/types";
import OrderItems from "./OrderItems";

interface OrderDetailsProps {
  order: Order;
  onClose: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onClose }) => {
  const orderDate = new Date(order.created_at).toLocaleDateString();
  const paidDate = order.paid_at ? new Date(order.paid_at).toLocaleDateString() : null;
  const deliveredDate = order.delivered_at ? new Date(order.delivered_at).toLocaleDateString() : null;

  console.log(order)
  return (
    <div className="sticky top-8 space-y-6">
      {/* Order Summary */}
      <div className="bg-[theme(--card)] p-6 rounded-[theme(--radius)] shadow-[theme(--shadow-card)] border border-[theme(--border)]">
        <h3 className="text-lg font-semibold text-[theme(--foreground)] mb-4">
          Order Details
        </h3>

        {/* Order Info */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-between">
            <span className="text-[theme(--muted-foreground)]">Order #</span>
            <span className="font-medium text-[theme(--foreground)]">{order.order_number}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[theme(--muted-foreground)]">Date</span>
            <span className="font-medium text-[theme(--foreground)]">{orderDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[theme(--muted-foreground)]">Status</span>
            <span className="font-medium text-[theme(--foreground)] capitalize">{order.status}</span>
          </div>
          {paidDate && (
            <div className="flex justify-between">
              <span className="text-[theme(--muted-foreground)]">Paid</span>
              <span className="font-medium text-[theme(--foreground)]">{paidDate}</span>
            </div>
          )}
          {deliveredDate && (
            <div className="flex justify-between">
              <span className="text-[theme(--muted-foreground)]">Delivered</span>
              <span className="font-medium text-[theme(--foreground)]">{deliveredDate}</span>
            </div>
          )}
        </div>

        {/* Price Breakdown */}
        <div className="border-t border-[theme(--border)] pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-[theme(--muted-foreground)]">Subtotal</span>
            <span className="text-[theme(--foreground)]">₱{order.total_amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[theme(--muted-foreground)]">Shipping</span>
            <span className="text-[theme(--foreground)]">Free</span>
          </div>
          <div className="border-t border-[theme(--border)] pt-2">
            <div className="flex justify-between font-semibold">
              <span className="text-[theme(--foreground)]">Total</span>
              <span className="text-[theme(--primary)]">₱{order.paid_amount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <OrderItems items={order.items} />

      {/* Shipping Address */}
      <div className="bg-[theme(--card)] p-6 rounded-[theme(--radius)] shadow-[theme(--shadow-card)] border border-[theme(--border)]">
        <h4 className="font-semibold text-[theme(--foreground)] mb-3">Shipping Address</h4>
        <div className="text-[theme(--muted-foreground)] text-sm">
          <p>{order.shipping_address.first_name} {order.shipping_address.last_name}</p>
          <p>{order.shipping_address.address}</p>
          <p>
            {order.shipping_address.city}, {order.shipping_address.province} {order.shipping_address.zip_code}
          </p>
          {order.shipping_address.phone && (
            <p className="mt-2">📞 {order.shipping_address.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;