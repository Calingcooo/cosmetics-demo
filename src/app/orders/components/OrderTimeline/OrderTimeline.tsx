// orders/components/OrderTimeline/OrderTimeline.tsx
import React from "react";
import type { Order } from "@/app/types";

interface OrderTimelineProps {
  order: Order;
}

const OrderTimeline: React.FC<OrderTimelineProps> = ({ order }) => {
  const steps = [
    {
      key: "ordered",
      label: "Order Placed",
      date: order.created_at,
      completed: true,
    },
    {
      key: "paid",
      label: "Payment Confirmed",
      date: order.paid_at,
      completed: !!order.paid_at,
    },
    {
      key: "processing",
      label: "Processing",
      date: order.paid_at, // Starts when paid
      completed: ["processing", "shipped", "delivered"].includes(order.status),
    },
    {
      key: "shipped",
      label: "Shipped",
      date: order.shipped_at,
      completed: ["shipped", "delivered"].includes(order.status),
    },
    {
      key: "delivered",
      label: "Delivered",
      date: order.delivered_at,
      completed: order.status === "delivered",
    },
  ];

  const currentStep = steps.findIndex((step) => !step.completed);
  const activeStep = currentStep === -1 ? steps.length - 1 : currentStep - 1;

  return (
    <div className="bg-[theme(--card)] p-6 rounded-[theme(--radius)] shadow-[theme(--shadow-card)] border border-[theme(--border)]">
      <h3 className="text-lg font-semibold text-[theme(--foreground)] mb-4">
        Order Status
      </h3>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.key} className="flex items-start space-x-3">
            {/* Timeline dot */}
            <div
              className={`flex-shrink-0 w-3 h-3 rounded-full mt-1 ${
                index <= activeStep
                  ? "bg-[theme(--primary)]"
                  : "bg-[theme(--muted)]"
              }`}
            />

            {/* Content */}
            <div className="flex-1">
              <div
                className={`font-medium ${
                  index <= activeStep
                    ? "text-[theme(--foreground)]"
                    : "text-[theme(--muted-foreground)]"
                }`}
              >
                {step.label}
              </div>

              {step.date && (
                <div className="text-sm text-[theme(--muted-foreground)] mt-1">
                  {new Date(step.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              )}

              {index === activeStep && step.date && (
                <div className="text-xs text-[theme(--primary)] mt-1">
                  Current Status
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Shipping Info */}
      {order.shipping_address && (
        <div className="mt-6 pt-4 border-t border-[theme(--border)]">
          <h4 className="font-medium text-[theme(--foreground)] mb-2">
            Shipping Address
          </h4>
          <div className="text-sm text-[theme(--muted-foreground)]">
            <p>
              {order.shipping_address.first_name}{" "}
              {order.shipping_address.last_name}
            </p>
            <p>{order.shipping_address.address}</p>
            <p>
              {order.shipping_address.city}, {order.shipping_address.province}{" "}
              {order.shipping_address.zip_code}
            </p>
            {order.shipping_address.phone && (
              <p className="mt-1">📞 {order.shipping_address.phone}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTimeline;
