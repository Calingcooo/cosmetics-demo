"use client";

import React, { createContext, useState, ReactNode, useEffect } from "react";
import { StaticImageData } from "next/image";
import { useToast } from "../hooks/useToast";
import { useAuth } from "../hooks/useAuth";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string | StaticImageData;
  category?: string;
  quantity: number;
  selectedVariations?: Record<string, string>;
}

interface CartContextType {
  items: CartItem[];
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (
    id: number,
    selectedVariations?: Record<string, string>
  ) => void;
  updateQuantity: (
    id: number,
    quantity: number,
    selectedVariations?: Record<string, string>
  ) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();

  // Load guest cart from localStorage on mount                              */
  useEffect(() => {
    if (!isAuthenticated) {
      const stored = localStorage.getItem("guest_cart");
      if (stored) setItems(JSON.parse(stored));
    }
  }, [isAuthenticated]);

  // Persist guest cart in localStorage                                      */
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("guest_cart", JSON.stringify(items));
    }
  }, [items, isAuthenticated]);

  const addToCart = async (item: Omit<CartItem, "quantity">) => {
    if (isAuthenticated) {
      // ✅ Authenticated user: send to backend
      try {
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...item, quantity: 1 }),
        });

        if (!res.ok) throw new Error("Failed to add to cart");

        addToast({
          title: "Added to Cart",
          description: `${item.name} added to your cart`,
        });
      } catch (err) {
        console.error(err);
        addToast({
          title: "Error",
          description: "Could not add item to your cart. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      // Guest cart (local state)
      setItems((prevItems) => {
        const existingItem = prevItems.find(
          (i) =>
            i.id === item.id &&
            JSON.stringify(i.selectedVariations) ===
              JSON.stringify(item.selectedVariations)
        );

        if (existingItem) {
          addToast({
            title: "Updated Cart",
            description: `${item.name} quantity increased`,
          });

          return prevItems.map((i) =>
            i.id === item.id &&
            JSON.stringify(i.selectedVariations) ===
              JSON.stringify(item.selectedVariations)
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }

        addToast({
          title: "Added to Cart",
          description: `${item.name} added to your cart`,
        });

        return [...prevItems, { ...item, quantity: 1 }];
      });
    }
  };

  const removeFromCart = (
    id: number,
    selectedVariations?: Record<string, string>
  ) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.id === id &&
            JSON.stringify(item.selectedVariations) ===
              JSON.stringify(selectedVariations)
          )
      )
    );

    addToast({
      title: "Removed from Cart",
      description: "Item removed from your cart",
      variant: "destructive",
    });
  };

  const updateQuantity = (
    id: number,
    quantity: number,
    selectedVariations?: Record<string, string>
  ) => {
    if (quantity <= 0) {
      removeFromCart(id, selectedVariations);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id &&
        JSON.stringify(item.selectedVariations) ===
          JSON.stringify(selectedVariations)
          ? { ...item, quantity }
          : item
      )
    );

    addToast({
      title: "Quantity Updated",
      description: "Item quantity has been updated",
    });
  };

  const clearCart = () => {
    setItems([]);
    addToast({
      title: "Cart Cleared",
      description: "All items removed from your cart",
      variant: "destructive",
    });
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        setItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
