"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LuMinus, LuPlus, LuTrash2, LuCreditCard } from "react-icons/lu";

import { useCart } from "@/lib/hooks/cart/useCart";
import { useDebounce } from "@/lib/hooks/debounce/useDebounce";

import CartPageSkeleton from "@/components/ui/loading/CartPageSkeleton";

const CartPage = () => {
  const { items, updateItemCart, updateQuantityImmediate, fetchUserCart, removeFromCart, totalPrice } =
    useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string>("");

  const debouncedUpdate = useDebounce(
    (
      id: string,
      quantity: number,
      selected_variations: Record<string, string>
    ) => {
      updateItemCart({ id, quantity, selected_variations });
    },
    400
  );

  useEffect(() => {
    const loadCart = async () => {
      await fetchUserCart();
      setLoading(false);
    };
    loadCart();
  }, []);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setCheckoutLoading(true);
    setCheckoutError("");

    try {
      // Calculate final total including shipping
      const shippingCost = totalPrice >= 50 ? 0 : 5.99;
      const finalTotal = totalPrice + shippingCost;

      console.log('🔄 Creating payment intent for total:', finalTotal);

      // Call our API route to create payment intent
      const response = await fetch('/api/payment-intents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: finalTotal,
          description: `Purchase of ${items.length} items`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment intent');
      }

      console.log('✅ Payment intent created:', data.id);

      // Store cart data temporarily for the checkout page
      const checkoutData = {
        items,
        total: finalTotal,
        paymentIntentId: data.id,
        clientKey: data.clientKey
      };
      
      sessionStorage.setItem('checkout_data', JSON.stringify(checkoutData));

      // Redirect to checkout page
      router.push('/checkout');

    } catch (error) {
      console.error("Checkout error:", error);
      setCheckoutError(error instanceof Error ? error.message : "Failed to initialize checkout");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleTestCheckout = async () => {
    if (items.length === 0) return;

    setCheckoutLoading(true);
    setCheckoutError("");

    try {
      const shippingCost = totalPrice >= 50 ? 0 : 5.99;
      const finalTotal = totalPrice + shippingCost;

      console.log('🔄 Test checkout for total:', finalTotal);

      // Call our API route to create payment intent
      const response = await fetch('/api/payment-intents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: finalTotal,
          description: `Test purchase of ${items.length} items`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment intent');
      }

      console.log('✅ Test payment intent created:', data.id);

      // For test mode, show payment instructions
      const proceed = window.confirm(
        `TEST MODE: Payment intent created successfully!\n\n` +
        `Payment Intent ID: ${data.id}\n` +
        `Amount: $${finalTotal.toFixed(2)}\n\n` +
        `You can:\n` +
        `1. Use Paymongo's test cards in your payment form\n` +
        `2. Check the Paymongo dashboard for this payment intent\n\n` +
        `Click OK to proceed to a simple payment form.`
      );

      if (proceed) {
        // Store data for payment page
        const paymentData = {
          paymentIntentId: data.id,
          clientKey: data.clientKey,
          amount: finalTotal,
          description: `Test purchase of ${items.length} items`,
          items: items
        };
        
        sessionStorage.setItem('test_payment_data', JSON.stringify(paymentData));
        router.push('/test-payment');
      }

    } catch (error) {
      console.error("Test checkout error:", error);
      setCheckoutError(error instanceof Error ? error.message : "Payment failed");
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return <CartPageSkeleton />;
  }

  const handleQuantityChange = (
    id: string,
    quantity: number,
    selected_variations: Record<string, string>
  ) => {
    updateQuantityImmediate({ id, quantity, selected_variations })
    debouncedUpdate(id, quantity, selected_variations);
  };

  // Calculate shipping and final total
  const shippingCost = totalPrice >= 50 ? 0 : 5.99;
  const finalTotal = totalPrice + shippingCost;

  // ✅ Empty cart
  if (items.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center max-w-md mx-auto space-y-4 px-4">
          <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
          <p className="text-[theme(--muted-foreground)]">
            Add some beautiful products to get started!
          </p>
          <button
            className="h-11 rounded-md px-8 bg-[theme(--primary)] text-[theme(--primary-foreground)] hover:bg-[theme(--primary)]/90 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors cursor-pointer"
            onClick={() => router.push("/products")}
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  // ✅ Has cart items
  return (
    <div className="flex-1 container mx-auto px-4 py-8 flex flex-col">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8 flex-1">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Your existing cart items code remains the same */}
          {items.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex gap-4 bg-[theme(--card)] p-4 rounded-lg border border-[theme(--border)]/40 shadow-sm"
            >
              {/* ... existing item rendering code ... */}
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 bg-[theme(--card)] self-start shadow-sm">
          <div className="bg-card p-6 rounded-lg border border-[theme(--border)]/40 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            {/* Test Mode Banner */}
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-3 py-2 rounded mb-4 text-sm">
              <strong>TEST MODE:</strong> Payments are simulated
            </div>

            {checkoutError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4 text-sm">
                {checkoutError}
              </div>
            )}

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-[theme(--muted-foreground)]">
                  Subtotal
                </span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[theme(--muted-foreground)]">
                  Shipping
                </span>
                <span>{totalPrice >= 50 ? "FREE" : "$5.99"}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-[theme(--primary)]">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Buttons */}
            <div className="space-y-3">
              <button
                className="h-11 rounded-md px-8 bg-[theme(--primary)] text-[theme(--primary-foreground)] hover:bg-[theme(--primary)]/90 inline-flex items-center justify-center gap-2 text-sm font-medium w-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleCheckout}
                disabled={checkoutLoading}
              >
                {checkoutLoading ? (
                  "Processing..."
                ) : (
                  <>
                    <LuCreditCard className="h-4 w-4" />
                    Proceed to Checkout
                  </>
                )}
              </button>

              {/* Test Payment Button */}
              <button
                className="h-10 rounded-md px-8 bg-green-600 text-white hover:bg-green-700 inline-flex items-center justify-center gap-2 text-sm font-medium w-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleTestCheckout}
                disabled={checkoutLoading}
              >
                {checkoutLoading ? "Processing..." : "Test Payment Now"}
              </button>

              <button
                className="h-10 px-4 py-2 border border-[theme(--input)] bg-[theme(--background)] hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)] inline-flex items-center justify-center rounded-md text-sm font-medium w-full transition-colors"
                onClick={() => router.push("/products")}
              >
                Continue Shopping
              </button>
            </div>

            {/* Test Card Info */}
            <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
              <h3 className="font-semibold mb-2">Test Cards:</h3>
              <ul className="space-y-1">
                <li>• 4343 4343 4343 4343 - Successful Payment</li>
                <li>• 4000 0000 0000 0002 - Card Declined</li>
                <li>• 4000 0000 0000 0069 - Insufficient Funds</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;