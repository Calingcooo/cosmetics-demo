// checkout/components/OrderSummary/PriceBreakdown.tsx
import React from "react";

interface PriceBreakdownProps {
  subtotal: number;
  shippingCost: number;
  taxAmount: number;
  total: number;
}

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({
  subtotal,
  shippingCost,
  taxAmount,
  total,
}) => {
  return (
    <div className="bg-[theme(--card)] p-6 rounded-[theme(--radius)] shadow-[theme(--shadow-card)] border border-[theme(--border)]">
      <h3 className="text-lg font-semibold text-[theme(--foreground)] mb-4">
        Price Breakdown
      </h3>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-[theme(--muted-foreground)]">Subtotal:</span>
          <span className="text-[theme(--foreground)]">
            ₱{subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-[theme(--muted-foreground)]">Shipping:</span>
          <span className="text-[theme(--foreground)]">
            {shippingCost === 0 ? "Free" : `₱${shippingCost.toFixed(2)}`}
          </span>
        </div>

        {/* Uncomment if you want to show tax */}
        {/* <div className="flex justify-between">
          <span className="text-[theme(--muted-foreground)]">Tax (12%):</span>
          <span className="text-[theme(--foreground)]">
            ₱{taxAmount.toFixed(2)}
          </span>
        </div> */}

        <div className="border-t border-[theme(--border)] pt-3 mt-3">
          <div className="flex justify-between text-lg font-bold">
            <span className="text-[theme(--foreground)]">Total:</span>
            <span className="text-[theme(--primary)]">₱{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakdown;
