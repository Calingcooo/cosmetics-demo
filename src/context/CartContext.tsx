"use client";

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import type { AxiosError } from "axios";
import { useToast } from "../app/hooks/useToast";
import { useAuth } from "../app/hooks/useAuth";
import { cartService } from "@/lib/api/cartService";
import type { CartItem } from "@/app/types";

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  myCart: () => Promise<void>;
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (
    id: string,
    selectedVariations?: Record<string, string>
  ) => void;
  updateQuantity: (
    id: string,
    quantity: number,
    selectedVariations?: Record<string, string>
  ) => void;
  clearCart: () => void;
  totalPrice: number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();

  // Get cart items count
  useEffect(() => {
    setCartCount(items.length);
  }, [items]);

  // Load guest cart
  const loadGuestCart = useCallback(() => {
    const stored = localStorage.getItem("guest_cart");
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  const saveGuestCart = (cart: CartItem[]) => {
    localStorage.setItem("guest_cart", JSON.stringify(cart));
  };

  // Load authenticated cart
  const loadUserCart = useCallback(async () => {
    try {
      const { data } = await cartService.me("/api/cart/me");

      const fetchedItems = data.data.cart.items || [];

      setItems(fetchedItems);
    } catch (error) {
      console.error("❌ Error fetching user cart:", error);
      addToast({
        title: "Error loading cart",
        description: "Unable to load your cart. Please try again later.",
        variant: "destructive",
      });
    }
  }, [addToast]);

  // Migrate guest cart -> authenticated cart
  // const migrateGuestCart = useCallback(async () => {
  //   const stored = localStorage.getItem("guest_cart");
  //   if (!stored) return;

  //   const guestItems = JSON.parse(stored) as CartItem[];
  //   if (guestItems.length === 0) return;

  //   try {
  //     for (const item of guestItems) {
  //       await cartService.addCart("/api/cart/add", item);
  //     }
  //     localStorage.removeItem("guest_cart");
  //     await loadUserCart();
  //   } catch (error) {
  //     console.error("⚠️ Error migrating guest cart:", error);
  //   }
  // }, [loadUserCart]);

  // Determine which cart to load
  useEffect(
    () => {
      if (isAuthenticated) {
        // migrateGuestCart().then(loadUserCart);
        loadUserCart();
      } else {
        loadGuestCart();
      }
    },
    // [isAuthenticated, migrateGuestCart, loadGuestCart, loadUserCart]
    [isAuthenticated, loadGuestCart, loadUserCart]
  );

  // Fetch user cart
  const myCart = async () => {
    if (isAuthenticated) await loadUserCart();
    else loadGuestCart();
  };

  const addToCart = async (item: CartItem) => {
    if (isAuthenticated) {
      try {
        const { data } = await cartService.addCart("/api/cart/add", item);

        console.log(data);

        addToast({
          title: "Added to Cart",
          description: `${item.name} added to your cart`,
        });
        await loadUserCart();
      } catch (error) {
        const err = error as AxiosError<{ message?: string }>;
        addToast({
          title: "Error",
          description: err.response?.data?.message || "Failed to add to cart.",
          variant: "destructive",
        });
      }
    } else {
      // Guest Cart
      setItems((prev) => {
        const existing = prev.find(
          (i) =>
            i.id === item.id &&
            JSON.stringify(i.selected_variations) ===
              JSON.stringify(item.selected_variations)
        );
        let newCart: CartItem[];

        if (existing) {
          newCart = prev.map((i) =>
            i.id === item.id &&
            JSON.stringify(i.selected_variations) ===
              JSON.stringify(item.selected_variations)
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
          addToast({
            title: "Updated Cart",
            description: `${item.name} quantity increased`,
          });
        } else {
          newCart = [...prev, { ...item, quantity: 1 }];
          addToast({
            title: "Added to Cart",
            description: `${item.name} added to your cart`,
          });
        }
        saveGuestCart(newCart);
        return newCart;
      });
    }
  };

  const removeFromCart = (
    id: string,
    selected_variations?: Record<string, string>
  ) => {
    setItems((prev) => {
      const newCart = prev.filter(
        (item) =>
          !(
            item.id === id &&
            JSON.stringify(item.selected_variations) ===
              JSON.stringify(selected_variations)
          )
      );
      if (!isAuthenticated) saveGuestCart(newCart);
      return newCart;
    });
    addToast({
      title: "Removed from Cart",
      description: "Item removed from your cart",
      variant: "destructive",
    });
  };

  const updateQuantity = (
    id: string,
    quantity: number,
    selected_variations?: Record<string, string>
  ) => {
    if (quantity <= 0) {
      removeFromCart(id, selected_variations);
      return;
    }

    setItems((prev) =>
      prev.map((i) =>
        i.id === id &&
        JSON.stringify(i.selected_variations) ===
          JSON.stringify(selected_variations)
          ? { ...i, quantity }
          : i
      )
    );

    addToast({
      title: "Quantity Updated",
      description: "Item quantity updated",
    });
  };

  const clearCart = () => {
    setItems([]);
    if (!isAuthenticated) localStorage.removeItem("guest_cart");
    addToast({
      title: "Cart Cleared",
      description: "All items removed from your cart",
      variant: "destructive",
    });
  };

  const totalPrice = items?.reduce((sum, i) => {
    return sum + Number(i.price_at_add) * i.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        setCartCount,
        setItems,
        addToCart,
        myCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
