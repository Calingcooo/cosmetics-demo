// cart/components/CartActions/CartActions.tsx
"use client";

import React from "react";
import Link from "next/link";
import { CartItem as CartItemType } from "@/app/types";
import { useUser } from "@/lib/hooks/user/useUser";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/auth/useAuth";
import { isAddressComplete } from "@/lib/helpers/address.helper";

interface CartActionsProps {
  selectedItems: number[];
  onSelectedItemsChange: (selected: number[]) => void;
  items: CartItemType[];
}

const CartActions: React.FC<CartActionsProps> = ({
  selectedItems,
  onSelectedItemsChange,
  items,
}) => {
  const router = useRouter();
  const { user } = useUser();
  const { isAuthenticated } = useAuth();

  // Calculate quick total for selected items
  const selectedSubtotal = items
    .filter((_, index) => selectedItems.includes(index))
    .reduce((sum, item) => sum + item.price_at_add * item.quantity, 0);

  const selectedTotal = selectedSubtotal;

  const hasCompleteAddress = user ? isAddressComplete(user) : false;
  const canCheckout = selectedItems.length > 0 && hasCompleteAddress;

  const handleProceedToCheckout = () => {
    if (canCheckout) {
      // Store selected items for checkout page
      sessionStorage.setItem(
        "selectedCartItems",
        JSON.stringify(selectedItems)
      );
      router.push("/checkout");
    }
  };

  const handleRemoveSelected = () => {
    // Remove selected items from cart
    selectedItems.forEach((index) => {
      const item = items[index];
      // You'll need to add a bulk remove function to your cart hook
      // removeFromCart(item.id, item.selected_variations);
    });
    onSelectedItemsChange([]);
  };

  return (
    <div className="sticky top-8 space-y-6">
      {/* Quick Checkout Card */}
      <div className="bg-[theme(--card)] p-6 rounded-[theme(--radius)] shadow-[theme(--shadow-card)] border border-[theme(--border)]">
        <h3 className="text-lg font-semibold text-[theme(--foreground)] mb-4">
          Quick Actions
        </h3>

        {/* Selection Summary */}
        <div className="mb-4 p-3 bg-[theme(--muted)] rounded-[theme(--radius)]">
          <p className="text-[theme(--foreground)] text-sm font-medium text-center">
            {selectedItems.length} items selected
          </p>
          {selectedItems.length > 0 && (
            <p className="text-[theme(--primary)] font-bold text-center mt-1">
              ₱{selectedTotal.toFixed(2)}
            </p>
          )}
        </div>

        {/* Checkout Button Area */}
        <div className="space-y-3">
          {isAuthenticated ? (
            <button
              onClick={handleProceedToCheckout}
              disabled={!canCheckout}
              className={`w-full py-3 px-4 rounded-[theme(--radius)] font-medium transition-[theme(--transition-smooth)] ${
                canCheckout
                  ? "bg-[theme(--primary)] text-[theme(--primary-foreground)] hover:bg-[theme(--primary-hover)] cursor-pointer"
                  : "bg-[theme(--muted)] text-[theme(--muted-foreground)] cursor-not-allowed"
              }`}
            >
              {canCheckout
                ? `Checkout ${selectedItems.length} Items`
                : selectedItems.length === 0
                ? "Select Items to Checkout"
                : "Complete Profile to Checkout"}
            </button>
          ) : (
            <div className="bg-[theme(--primary)]/5 border border-[theme(--primary)]/20 rounded-[theme(--radius)] p-4">
              <p className="text-[theme(--primary)] text-sm font-medium mb-2 text-center">
                Sign In to Checkout
              </p>
              <p className="text-[theme(--muted-foreground)] text-xs mb-3 text-center">
                Access your saved cart and faster checkout
              </p>
              <Link
                href="/login"
                className="block w-full text-center py-2 bg-[theme(--primary)] text-[theme(--primary-foreground)] rounded-[theme(--radius)] font-medium hover:bg-[theme(--primary-hover)] transition-colors"
              >
                Sign In
              </Link>
            </div>
          )}

          {/* Remove Selected Button */}
          {selectedItems.length > 0 && (
            <button
              onClick={handleRemoveSelected}
              className="w-full py-2 px-4 border border-[theme(--destructive)] text-[theme(--destructive)] rounded-[theme(--radius)] font-medium hover:bg-[theme(--destructive)] hover:text-[theme(--destructive-foreground)] transition-colors"
            >
              Remove Selected
            </button>
          )}
        </div>
      </div>

      {/* Help & Info Cards */}
      {!hasCompleteAddress && user && selectedItems.length > 0 && (
        <div className="bg-[theme(--destructive)]/10 border border-[theme(--destructive)]/20 rounded-[theme(--radius)] p-4">
          <p className="text-[theme(--destructive)] text-sm font-medium mb-2">
            Complete Your Profile
          </p>
          <p className="text-[theme(--muted-foreground)] text-xs mb-3">
            Add your shipping address to checkout
          </p>
          <Link
            href="/account?tab=shipping"
            className="text-[theme(--primary)] hover:text-[theme(--primary-hover)] text-xs font-medium"
          >
            Update Profile →
          </Link>
        </div>
      )}

      {/* Security & Trust */}
      <div className="bg-[theme(--muted)] p-4 rounded-[theme(--radius)] text-center">
        <p className="text-[theme(--muted-foreground)] text-xs mb-2">
          🔒 Secure Checkout
        </p>
        <p className="text-[theme(--muted-foreground)] text-xs">
          Free shipping on orders over ₱500
        </p>
      </div>
    </div>
  );
};

export default CartActions;