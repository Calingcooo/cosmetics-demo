import { api } from "../axios/instance";
import type { ApiResponse, Cart, CartItem } from "@/app/types";

export const cartService = {
    // Fetch the user's current cart
    me: (endpoint: string) =>
        api.get<ApiResponse<{ cart: Cart }>>(endpoint, { withCredentials: true }),

    count: (endpoint: string) => api.get<ApiResponse<{ cart_count: number }>>(endpoint, {
        withCredentials: true,
    }),

    // Add an item to the cart
    addCart: (endpoint: string, item: CartItem) =>
        api.post<ApiResponse<{ cart: CartItem[] }>>(endpoint, item, {
            withCredentials: true,
        }),

    // Remove an item from the cart
    removeItem: (
        endpoint: string,
        data: { id: string; selected_variations?: Record<string, string> }
    ) =>
        api.post<ApiResponse<{ cart: Cart }>>(endpoint, data, {
            withCredentials: true,
        }),

    // Update an item from the cart
    updateItem: (
        endpoint: string,
        data: { id: string; quantity: number, selected_variations?: Record<string, string> }
    ) =>
        api.post<ApiResponse<{ cart: Cart }>>(endpoint, data, {
            withCredentials: true,
        }),

    // Clear all items from the user's cart
    clearCart: (endpoint: string) =>
        api.post<ApiResponse<{ success: boolean }>>(endpoint, {}, {
            withCredentials: true,
        }),

    // Migrate guest cart items to user cart
    migrateCart: (endpoint: string, items: CartItem[]) =>
        api.post<ApiResponse<{ cart: Cart }>>(endpoint, items, { withCredentials: true })
};
