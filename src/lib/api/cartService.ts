import { api } from "../axios/instance";
import type { ApiResponse, Cart, CartItem } from "@/app/types";

export const cartService = {
    // My cart
    me: (endpoint: string) => api.get<ApiResponse<{ cart: Cart }>>(endpoint),

    // Add to cart
    addCart: (endpoint: string, item: CartItem) => api.post<ApiResponse<{ cart: CartItem[] }>>(endpoint,
        item, { withCredentials: true })
};