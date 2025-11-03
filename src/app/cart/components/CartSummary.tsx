import { LuCreditCard } from "react-icons/lu";
import { useCartCheckout } from "../hooks/useCartCheckout";
import { useCart } from "@/lib/hooks/cart/useCart";
import { useRouter } from "next/navigation";

export const CartSummary = () => {
  const { totalPrice } = useCart();
  const { loading, error, processHitPayCheckout } = useCartCheckout();
  const router = useRouter();

  const shippingCost = totalPrice >= 50 ? 0 : 5.99;
  const finalTotal = totalPrice + shippingCost;

  return (
    <div className="lg:col-span-1 bg-[theme(--card)] self-start shadow-sm">
      <div className="bg-card p-6 rounded-lg border border-[theme(--border)]/40 sticky top-4">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        {/* Sandbox Mode Banner */}
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-3 py-2 rounded mb-4 text-sm">
          <strong>SANDBOX MODE:</strong> Using HitPay Test Environment
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Order Breakdown */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-[theme(--muted-foreground)]">Subtotal</span>
            <span>₱{totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[theme(--muted-foreground)]">Shipping</span>
            <span>{totalPrice >= 50 ? "FREE" : "₱5.99"}</span>
          </div>
          <div className="border-t pt-3 flex justify-between font-bold">
            <span>Total</span>
            <span className="text-[theme(--primary)]">₱{finalTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Checkout Buttons */}
        <div className="space-y-3">
          <button
            className="h-11 rounded-md px-8 bg-[theme(--primary)] text-[theme(--primary-foreground)] hover:bg-[theme(--primary)]/90 inline-flex items-center justify-center gap-2 text-sm font-medium w-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            onClick={processHitPayCheckout}
            disabled={loading}
          >
            {loading ? (
              "Redirecting to Payment..."
            ) : (
              <>
                <LuCreditCard className="h-4 w-4" />
                Pay with HitPay
              </>
            )}
          </button>

          <button
            className="h-10 px-4 py-2 border border-[theme(--input)] bg-[theme(--background)] hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)] inline-flex items-center justify-center rounded-md text-sm font-medium w-full transition-colors cursor-pointer"
            onClick={() => router.push("/products")}
          >
            Continue Shopping
          </button>
        </div>

        {/* Test Info */}
        <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
          <h3 className="font-semibold mb-2">HitPay Sandbox Testing:</h3>
          <ul className="space-y-1">
            <li>• Use test cards: 4242 4242 4242 4242</li>
            <li>• Any future expiry date</li>
            <li>• Any 3-digit CVC</li>
            <li>• Redirects to HitPay sandbox</li>
          </ul>
        </div>
      </div>
    </div>
  );
};