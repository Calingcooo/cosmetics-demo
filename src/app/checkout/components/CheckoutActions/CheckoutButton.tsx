// checkout/components/CheckoutActions/CheckoutButton.tsx
import React from "react";
import type { User, CartItem } from "@/app/types";
import { useCartCheckout } from "../../hooks/useCartCheckout";
import { isAddressComplete } from "@/lib/helpers/address.helper";

interface CheckoutButtonProps {
  user: User | null;
  items: CartItem[];
  totalAmount: number;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  user,
  items,
  totalAmount,
}) => {
  const { processHitPayCheckout, loading, error } = useCartCheckout();
  const hasCompleteAddress = user ? isAddressComplete(user) : false;

  const handleCheckout = async () => {
    await processHitPayCheckout({ items, totalAmount });
  };

  return (
    <>
      <button
        onClick={handleCheckout}
        disabled={loading || !hasCompleteAddress || items.length === 0}
        className="w-full mt-6 bg-[theme(--primary)] text-[theme(--primary-foreground)] py-3 px-4 rounded-[theme(--radius)] font-medium hover:bg-[theme(--primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-[theme(--primary-foreground)] border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </span>
        ) : (
          `Proceed to Payment - ₱${totalAmount.toFixed(2)}`
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
