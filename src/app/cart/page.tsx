"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LuMinus, LuPlus, LuTrash2, LuCreditCard } from "react-icons/lu";

import { useCart } from "@/lib/hooks/cart/useCart";
import { useDebounce } from "@/lib/hooks/debounce/useDebounce";
import { useAuth } from "@/lib/hooks/auth/useAuth";

import CartPageSkeleton from "@/components/ui/loading/CartPageSkeleton";

const CartPage = () => {
  const {
    items,
    updateItemCart,
    updateQuantityImmediate,
    fetchUserCart,
    removeFromCart,
    totalPrice,
  } = useCart();
  const router = useRouter();
  const { minimalUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

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

  const handleHitPayCheckout = async () => {
    if (items.length === 0) return;

    setCheckoutLoading(true);
    setCheckoutError("");

    try {
      const shippingCost = totalPrice >= 50 ? 0 : 5.99;
      const finalTotal = totalPrice + shippingCost;

      console.log("🔄 Creating HitPay payment request for total:", finalTotal);

      // Call our API route to create HitPay payment
      const response = await fetch("/api/hitpay/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: finalTotal,
          email: minimalUser?.email,
          purpose: `Purchase of ${items.length} items`,
          items: items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price_at_add,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create HitPay payment");
      }

      if (!data.success) {
        throw new Error(data.message || "HitPay payment creation failed");
      }

      console.log("✅ HitPay payment created:", data.data);

      // Store cart data temporarily for after payment
      const checkoutData = {
        items,
        total: finalTotal,
        hitpayId: data.data.id,
        paymentRequestId: data.data.payment_request_id,
      };

      sessionStorage.setItem(
        "hitpay_checkout_data",
        JSON.stringify(checkoutData)
      );

      // Redirect to HitPay payment page
      if (data.data.url) {
        window.location.href = data.data.url;
      } else {
        throw new Error("No payment URL received from HitPay");
      }
    } catch (error) {
      console.error("HitPay checkout error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to initialize payment";
      setCheckoutError(errorMessage);
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
    updateQuantityImmediate({ id, quantity, selected_variations });
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
          {items.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex gap-4 bg-[theme(--card)] p-4 rounded-lg border border-[theme(--border)]/40 shadow-sm"
            >
              {/* Your existing item rendering code */}
              <div className="flex-shrink-0 w-24 h-24 relative">
                <Image
                  src={item.image || "/placeholder-product.jpg"}
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-[theme(--muted-foreground)] text-sm">
                  ₱{item.price_at_add}
                </p>

                {item.selected_variations &&
                  Object.keys(item.selected_variations).length > 0 && (
                    <div className="text-xs text-[theme(--foreground)] mb-2 space-y-1">
                      {Object.entries(item.selected_variations).map(
                        ([key, value]) => (
                          <div key={key}>
                            <span className="font-medium">{key}:</span> {value}
                          </div>
                        )
                      )}
                    </div>
                  )}

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.id,
                        Math.max(0, item.quantity - 1),
                        item.selected_variations || {}
                      )
                    }
                    className="w-8 h-8 rounded-full border border-[theme(--border)] inline-flex items-center justify-center hover:bg-[theme(--accent)] cursor-pointer"
                  >
                    <LuMinus className="h-3 w-3" />
                  </button>

                  <span className="text-sm font-medium w-8 text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.id,
                        item.quantity + 1,
                        item.selected_variations || {}
                      )
                    }
                    className="w-8 h-8 rounded-full border border-[theme(--border)] inline-flex items-center justify-center hover:bg-[theme(--accent)] cursor-pointer"
                  >
                    <LuPlus className="h-3 w-3" />
                  </button>

                  <button
                    onClick={() =>
                      removeFromCart({
                        id: item.id,
                        selected_variations: item.selected_variations,
                      })
                    }
                    className="ml-4 text-[theme(--destructive)] hover:text-[theme(--primary)] inline-flex items-center gap-1 text-sm cursor-pointer"
                  >
                    <LuTrash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  ${(item.price_at_add * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 bg-[theme(--card)] self-start shadow-sm">
          <div className="bg-card p-6 rounded-lg border border-[theme(--border)]/40 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            {/* Sandbox Mode Banner */}
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-3 py-2 rounded mb-4 text-sm">
              <strong>SANDBOX MODE:</strong> Using HitPay Test Environment
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
                <span>₱{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[theme(--muted-foreground)]">
                  Shipping
                </span>
                <span>{totalPrice >= 50 ? "FREE" : "₱5.99"}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-[theme(--primary)]">
                  ₱{finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="space-y-3">
              <button
                className="h-11 rounded-md px-8 bg-[theme(--primary)] text-[theme(--primary-foreground)] hover:bg-[theme(--primary)]/90 inline-flex items-center justify-center gap-2 text-sm font-medium w-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                onClick={handleHitPayCheckout}
                disabled={checkoutLoading}
              >
                {checkoutLoading ? (
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

            {/* HitPay Test Info */}
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
      </div>
    </div>
  );
};

export default CartPage;
