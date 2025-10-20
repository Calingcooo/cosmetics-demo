"use client";

import React, { createContext, useState, ReactNode } from "react";
import { StaticImageData } from "next/image";
import { useToast } from "../hooks/useToast";

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
  const { addToast } = useToast(); // 👈 Use the Toast context

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) =>
          i.id === item.id &&
          JSON.stringify(i.selectedVariations) ===
            JSON.stringify(item.selectedVariations)
      );

      if (existingItem) {
        // return new state only — don’t trigger toast here
        return prevItems.map((i) =>
          i.id === item.id &&
          JSON.stringify(i.selectedVariations) ===
            JSON.stringify(item.selectedVariations)
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      // return new state only — no toast yet
      return [...prevItems, { ...item, quantity: 1 }];
    });

    // ✅ Now trigger toast *after* state update
    const exists = items.find(
      (i) =>
        i.id === item.id &&
        JSON.stringify(i.selectedVariations) ===
          JSON.stringify(item.selectedVariations)
    );

    if (exists) {
      addToast({
        title: "Updated Cart",
        description: `${item.name} quantity increased`,
      });
    } else {
      addToast({
        title: "Added to Cart",
        description: `${item.name} added to your cart`,
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
