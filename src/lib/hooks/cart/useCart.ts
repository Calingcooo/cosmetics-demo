"use client";

import { useAppSelector, useAppDispatch } from "../reduxHooks";
import {
    fetchUserCart,
    addToCart,
    removeFromCart,
    loadGuestCartState,
    updateQuantity,
    migrateGuestCart,
    fetchCartCount
} from "@/redux/slice/cartSlice";
import type { CartItem } from "@/app/types";

export function useCart() {
    const { items, cartCount, totalPrice, loading, error } = useAppSelector(
        (state) => state.cart
    );

    const dispatch = useAppDispatch();

    return {
        // State
        items,
        cartCount,
        totalPrice,
        loading,
        error,

        // Actions
        fetchUserCart: () => dispatch(fetchUserCart()),

        addToCart: (item: CartItem) => dispatch(addToCart(item)),

        removeFromCart: (params: {
            id: string;
            selected_variations?: Record<string, string>;
        }) => dispatch(removeFromCart(params)),

        updateQuantity: (params: {
            id: string;
            quantity: number;
            selected_variations?: Record<string, string>;
        }) => dispatch(updateQuantity(params)),

        loadGuestCartState: () => dispatch(loadGuestCartState()),
        migrateGuestCart: () => dispatch(migrateGuestCart()),
        fetchCartCount: () => dispatch(fetchCartCount())
    };
}
