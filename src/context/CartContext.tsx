"use client";

import React, { createContext, useState, ReactNode, useEffect } from "react";
import { AxiosError } from "axios";

import { useToast } from "../app/hooks/useToast";
import { useAuth } from "../app/hooks/useAuth";
import { getMyCart, addToCart as apiAddToCart } from "@/services/cartApi";

import { ProductImage } from "@/app/types";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: ProductImage;
  category?: string;
  quantity: number;
  selectedVariations?: Record<string, string>;
}

interface CartContextType {
  items: CartItem[];
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (item: Omit<CartItem, "quantity">) => Promise<void>;
  removeFromCart: (id: number, selectedVariations?: Record<string, string>) => void;
  updateQuantity: (id: number, quantity: number, selectedVariations?: Record<string, string>) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { isAuthenticated, user } = useAuth();
  const { addToast } = useToast();

  // ✅ Load cart when authenticated
  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated && user) {
        try {
          const cartData = await getMyCart(user.id);
          setItems(cartData.items || []); // assuming backend returns { items: [...] }
        } catch (err) {
          console.error("❌ Failed to fetch cart:", err);
          addToast({
            title: "Error loading cart",
            description: "Unable to load your cart items. Please try again later.",
            variant: "destructive",
          });
        }
      } else {
        // Load guest cart
        const stored = localStorage.getItem("guest_cart");
        if (stored) setItems(JSON.parse(stored));
      }
    };

    loadCart();
  }, [isAuthenticated, user]);

  // ✅ Persist guest cart in localStorage
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("guest_cart", JSON.stringify(items));
    }
  }, [items, isAuthenticated]);

  // ✅ Add to cart
  const addToCart = async (item: Omit<CartItem, "quantity">) => {
    if (isAuthenticated && user) {
      try {
        const res = await apiAddToCart(item.id.toString(), 1);
        addToast({
          title: "Added to Cart",
          description: `${item.name} added to your cart`,
        });
        // Optionally refresh cart after add
        const updatedCart = await getMyCart(user.id);
        setItems(updatedCart.items || []);
      } catch (error) {
        const err = error as AxiosError;
        addToast({
          title: "Error",
          description:
            (err.response?.data as any)?.message || "Failed to add item to your cart.",
          variant: "destructive",
        });
      }
    } else {
      // Guest user cart
      setItems((prevItems) => {
        const existingItem = prevItems.find(
          (i) =>
            i.id === item.id &&
            JSON.stringify(i.selectedVariations) === JSON.stringify(item.selectedVariations)
        );

        if (existingItem) {
          addToast({
            title: "Updated Cart",
            description: `${item.name} quantity increased`,
          });
          return prevItems.map((i) =>
            i.id === item.id &&
            JSON.stringify(i.selectedVariations) === JSON.stringify(item.selectedVariations)
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

  // ✅ Remove from cart (guest only for now)
  const removeFromCart = (id: number, selectedVariations?: Record<string, string>) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.id === id &&
            JSON.stringify(item.selectedVariations) === JSON.stringify(selectedVariations)
          )
      )
    );

    addToast({
      title: "Removed from Cart",
      description: "Item removed from your cart",
      variant: "destructive",
    });
  };

  const updateQuantity = (id: number, quantity: number, selectedVariations?: Record<string, string>) => {
    if (quantity <= 0) {
      removeFromCart(id, selectedVariations);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id &&
        JSON.stringify(item.selectedVariations) === JSON.stringify(selectedVariations)
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
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
