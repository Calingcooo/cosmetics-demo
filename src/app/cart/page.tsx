"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { LuMinus, LuPlus, LuTrash2 } from "react-icons/lu";

import { useCart } from "../hooks/useCart";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const router = useRouter();

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
              <Image
                src={`${item.image}`}
                alt={item.name}
                loading="lazy"
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{item.name}</h3>
                <p className="text-sm text-[theme(--muted-foreground)] mb-1">
                  {item.category}
                </p>
                {item.selectedVariations &&
                  Object.keys(item.selectedVariations).length > 0 && (
                    <div className="text-xs text-[theme(--foreground)] mb-2 space-y-1">
                      {Object.entries(item.selectedVariations).map(
                        ([key, value]) => (
                          <div key={key}>
                            <span className="font-medium">{key}:</span> {value}
                          </div>
                        )
                      )}
                    </div>
                  )}
                <p className="text-[theme(--primary)] font-bold">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              <div className="flex flex-col items-end justify-between">
                <button
                  className="h-10 w-10 hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-[theme(--background)] transition-colors cursor-pointer"
                  onClick={() =>
                    removeFromCart(item.id, item.selectedVariations)
                  }
                >
                  <LuTrash2 className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2">
                  <button
                    className="h-10 w-10 border border-[theme(--input)] bg-[theme(--background)] hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)] inline-flex items-center justify-center rounded-md transition-colors cursor-pointer"
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity - 1,
                        item.selectedVariations
                      )
                    }
                  >
                    <LuMinus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    className="h-10 w-10 border border-[theme(--input)] bg-[theme(--background)] hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)] inline-flex items-center justify-center rounded-md transition-colors cursor-pointer"
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity + 1,
                        item.selectedVariations
                      )
                    }
                  >
                    <LuPlus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 bg-[theme(--card)] self-start shadow-sm">
          <div className="bg-card p-6 rounded-lg border border-[theme(--border)]/40 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
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
                  $
                  {(totalPrice >= 50 ? totalPrice : totalPrice + 5.99).toFixed(
                    2
                  )}
                </span>
              </div>
            </div>
            <button
              className="h-11 rounded-md px-8 bg-[theme(--primary)] text-[theme(--primary-foreground)] hover:bg-[theme(--primary)]/90 inline-flex items-center justify-center gap-2 text-sm font-medium w-full transition-colors"
              onClick={() => router.push("/checkout")}
            >
              Proceed to Checkout
            </button>
            <button
              className="h-10 px-4 py-2 border border-[theme(--input)] bg-[theme(--background)] hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)] inline-flex items-center justify-center rounded-md text-sm font-medium w-full mt-3 transition-colors"
              onClick={() => router.push("/products")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
