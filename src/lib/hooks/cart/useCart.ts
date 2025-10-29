"use client";

import { useAppSelector, useAppDispatch } from "../reduxHooks";
import {
    fetchUserCart,
    addToCart,
    removeFromCart,
    loadGuestCartState,
    migrateGuestCart,
    fetchCartCount,
    updateItemCart,
    updateQuantityImmediate 
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

        updateItemCart: (params: {
            id: string;
            quantity: number;
            selected_variations?: Record<string, string>;
        }) => dispatch(updateItemCart(params)),

        updateQuantityImmediate : (params: {
            id: string;
            quantity: number;
            selected_variations?: Record<string, string>;
        }) => dispatch(updateQuantityImmediate (params)), // Immediate quantity reflection

        loadGuestCartState: () => dispatch(loadGuestCartState()),
        migrateGuestCart: () => dispatch(migrateGuestCart()),
        fetchCartCount: () => dispatch(fetchCartCount())
    };
}
