// cart/components/CartActions/CartActions.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useUser } from "@/lib/hooks/user/useUser";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/auth/useAuth";
import { useCart } from "@/lib/hooks/cart/useCart";
import { isAddressComplete } from "@/lib/helpers/address.helper";

interface CartActionsProps {
  checkoutUrl: string;
}

const CartActions: React.FC<CartActionsProps> = ({ checkoutUrl }) => {
  const router = useRouter();
  const { user } = useUser();
  const { isAuthenticated } = useAuth();
  const { selectedItems, deselectAllCartItems, removeFromCart } = useCart();

  // Calculate totals for selected items
  const selectedTotal = selectedItems.reduce(
    (sum, item) => sum + item.price_at_add * item.quantity,
    0
  );

  const hasCompleteAddress = user ? isAddressComplete(user) : false;
  const canCheckout = selectedItems.length > 0 && hasCompleteAddress;

  const handleProceedToCheckout = () => {
    if (canCheckout) {
      router.push(checkoutUrl);
    }
  };

  const handleRemoveSelected = () => {
    // Remove selected items from cart
    selectedItems.forEach((item) => {
      removeFromCart({
        id: item.id,
        selected_variations: item.selected_variations,
      });
    });
    // Clear selection after removal
    deselectAllCartItems();
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
              className={`w-full py-3 px-4 rounded-[theme(--radius)] font-medium transition-colors ${
                canCheckout
                  ? "bg-[theme(--primary)] text-white hover:bg-[theme(--primary-hover)] cursor-pointer"
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
            <div className="bg-blue-50 border border-blue-200 rounded-[theme(--radius)] p-4">
              <p className="text-blue-700 text-sm font-medium mb-2 text-center">
                Sign In to Checkout
              </p>
              <p className="text-blue-600 text-xs mb-3 text-center">
                Access your saved cart and faster checkout
              </p>
              <Link
                href="/login"
                className="block w-full text-center py-2 bg-blue-600 text-white rounded-[theme(--radius)] font-medium hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
            </div>
          )}

          {/* Remove Selected Button */}
          {selectedItems.length > 0 && (
            <button
              onClick={handleRemoveSelected}
              className="w-full py-2 px-4 border border-red-600 text-red-600 rounded-[theme(--radius)] font-medium hover:bg-red-600 hover:text-white transition-colors"
            >
              Remove Selected
            </button>
          )}
        </div>
      </div>

      {/* Help & Info Cards */}
      {!hasCompleteAddress && user && selectedItems.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-[theme(--radius)] p-4">
          <p className="text-orange-700 text-sm font-medium mb-2">
            Complete Your Profile
          </p>
          <p className="text-orange-600 text-xs mb-3">
            Add your shipping address to checkout
          </p>
          <Link
            href="/account?tab=shipping"
            className="text-blue-600 hover:text-blue-700 text-xs font-medium"
          >
            Update Profile →
          </Link>
        </div>
      )}

      {/* Security & Trust */}
      <div className="bg-gray-50 p-4 rounded-[theme(--radius)] text-center">
        <p className="text-gray-600 text-xs mb-2">🔒 Secure Checkout</p>
        <p className="text-gray-600 text-xs">
          Free shipping on orders over ₱500
        </p>
      </div>
    </div>
  );
};

export default CartActions;
