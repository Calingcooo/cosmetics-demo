// checkout/components/CheckoutActions/CheckoutButton.tsx
import React from "react";
import { User } from "@/app/types";
import { useCartCheckout } from "@/app/cart/hooks/useCartCheckout";
import { useCart } from "@/lib/hooks/cart/useCart";
import { isAddressComplete } from "../../utils/checkout.helper";
import { useOrderSummary } from "../../hooks/useOrderSummary";

interface CheckoutButtonProps {
  user: User | null;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ user }) => {
  const { processHitPayCheckout, loading, error } = useCartCheckout();
  const orderSummary = useOrderSummary();
  const hasCompleteAddress = user ? isAddressComplete(user) : false;
  const { items } = useCart();

  const handleCheckout = async () => {
    await processHitPayCheckout();
  };

  return (
    <>
      <button
        onClick={handleCheckout}
        disabled={loading || !hasCompleteAddress || items.length === 0}
        className="w-full mt-6 bg-[theme(--primary)] text-[theme(--primary-foreground)] py-3 px-4 rounded-[theme(--radius)] font-medium hover:bg-[theme(--primary-hover)] transition-[theme(--transition-smooth)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-[theme(--primary-foreground)] border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </span>
        ) : (
          `Proceed to Payment - ₱${orderSummary.total.toFixed(2)}`
        )}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-[theme(--destructive)]/10 border border-[theme(--destructive)]/20 rounded-[theme(--radius)]">
          <p className="text-[theme(--destructive)] text-sm">{error}</p>
        </div>
      )}
    </>
  );
};

export default CheckoutButton;
