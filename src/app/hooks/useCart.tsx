"use client";

import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "./useAuth";
import axios from "axios";

export const useCart = () => {
  const context = useContext(CartContext);
  const { authenticated, user } = useAuth();

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  const { setItems } = context;

  // Fetch authenticated user's cart from backend
  useEffect(() => {
    const fetchCart = async () => {
      if (authenticated && user) {
        const { data } = await axios.get(`/api/cart/${user.id}`);
        setItems(data.items);
      }
    };

    fetchCart();
  }, [authenticated, user, setItems]);

  return context;
};
