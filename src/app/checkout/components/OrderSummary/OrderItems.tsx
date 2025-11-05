// checkout/components/OrderSummary/OrderItems.tsx
import React from "react";
import type { CartItem } from "@/app/types";

interface OrderItemsProps {
  items: CartItem[];
}

const OrderItems: React.FC<OrderItemsProps> = ({ items }) => {
  return (
    <div className="bg-[theme(--card)] p-6 rounded-[theme(--radius)] shadow-[theme(--shadow-card)] border border-[theme(--border)]">
      <h3 className="text-lg font-semibold text-[theme(--foreground)] mb-4">
        Order Items ({items.length})
      </h3>

      <div className="space-y-4 max-h-80 overflow-y-auto">
        {items.map((item) => (
          <div
            key={`${item.id}-${JSON.stringify(item.selected_variations)}`}
            className="flex items-center gap-4 py-3 border-b border-[theme(--border)] last:border-b-0"
          >
            <div className="w-16 h-16 bg-[theme(--muted)] rounded-[theme(--radius)] flex items-center justify-center">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-[theme(--radius)]"
                />
              ) : (
                <span className="text-[theme(--muted-foreground)] text-xs">
                  No image
                </span>
              )}
            </div>

            <div className="flex-1">
              <h3 className="font-medium text-[theme(--foreground)]">
                {item.name}
              </h3>
              {item.selected_variations && (
                <p className="text-[theme(--muted-foreground)] text-sm">
                  {Object.values(item.selected_variations).join(", ")}
                </p>
              )}
              <p className="text-[theme(--muted-foreground)] text-sm">
                Qty: {item.quantity}
              </p>
            </div>

            <div className="text-right">
              <p className="font-medium text-[theme(--foreground)]">
                ₱{(item.price_at_add * item.quantity).toFixed(2)}
              </p>
              <p className="text-[theme(--muted-foreground)] text-sm">
                ₱{item.price_at_add.toFixed(2)} each
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItems;
