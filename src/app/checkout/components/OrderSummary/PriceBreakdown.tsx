// checkout/components/OrderSummary/PriceBreakdown.tsx
import React from "react";
import { useOrderSummary } from "../../hooks/useOrderSummary";

const PriceBreakdown: React.FC = () => {
  const orderSummary = useOrderSummary();

  return (
    <div className="mt-4 space-y-3">
      <div className="flex justify-between">
        <span className="text-[theme(--muted-foreground)]">Subtotal:</span>
        <span className="text-[theme(--foreground)]">
          ₱{orderSummary.subtotal.toFixed(2)}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-[theme(--muted-foreground)]">Shipping:</span>
        <span className="text-[theme(--foreground)]">
          Free
          {/* {orderSummary.shipping === 0
            ? "Free"
            : `₱${orderSummary.shipping.toFixed(2)}`} */}
        </span>
      </div>

      {/* <div className="flex justify-between">
        <span className="text-[theme(--muted-foreground)]">Tax (12%):</span>
        <span className="text-[theme(--foreground)]">
          ₱{orderSummary.tax.toFixed(2)}
        </span>
      </div> */}

      <div className="border-t border-[theme(--border)] pt-3 mt-3">
        <div className="flex justify-between text-lg font-bold">
          <span className="text-[theme(--foreground)]">Total:</span>
          <span className="text-[theme(--primary)]">
            ₱{orderSummary.total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakdown;
