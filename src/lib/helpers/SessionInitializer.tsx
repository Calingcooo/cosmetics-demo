"use client";

import { useEffect } from "react";
import { useAuth } from "../hooks/auth/useAuth";
import { useCart } from "../hooks/cart/useCart";

export default function SessionInitializer() {
  const { initialized, isAuthenticated, restoreSession } = useAuth();
  const { migrateGuestCart, loadGuestCartState, fetchCartCount, fetchUserCart } = useCart();

  // Restore session on first mount
  useEffect(() => {
    restoreSession();
  }, []);

  // Once initialized, decide which cart to load
  useEffect(() => {
    if (!initialized) return;
    
    if (isAuthenticated) {
      // Always fetch cart count for authenticated users
      fetchCartCount();
      
      // Only migrate if there are guest items and migration hasn't been done
      const guestItems = JSON.parse(localStorage.getItem("guest_cart") || "[]");
      if (guestItems.length > 0) {
        migrateGuestCart();
      } else {
        // If no guest items, just fetch the user's cart
        fetchUserCart();
      }
    } else {
      // Load guest cart from localStorage
      loadGuestCartState();
    }
  }, [initialized, isAuthenticated]);

  return null;
}