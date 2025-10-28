"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { cartService } from "@/lib/api/cartService";
import type { CartItem } from "@/app/types";
import { AppDispatch, RootState } from "@/redux/store";

export interface CartState {
    items: CartItem[];
    cartCount: number;
    totalPrice: number;
    loading: boolean;
    error: string | null;
    migrationCompleted: boolean;
}

const initialState: CartState = {
    items: [],
    cartCount: 0,
    totalPrice: 0,
    loading: false,
    error: null,
    migrationCompleted: false
};

// 🧩 Utilities for localStorage guest cart
const loadGuestCart = (): CartItem[] => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("guest_cart");
    return stored ? JSON.parse(stored) : [];
};

const saveGuestCart = (cart: CartItem[]) => {
    localStorage.setItem("guest_cart", JSON.stringify(cart));
};

// Track migration status per user
const getMigrationStatus = (): boolean => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("cart_migrated") === "true";
};

const setMigrationStatus = (status: boolean) => {
    localStorage.setItem("cart_migrated", status.toString());
};

const clearMigrationStatus = () => {
    localStorage.removeItem("cart_migrated");
};

// 🧠 Compute total and count
const calculateTotals = (items: CartItem[]) => {
    const totalPrice = items.reduce((sum, i) => sum + Number(i.price_at_add) * i.quantity, 0);
    const cartCount = items.length;
    return { totalPrice, cartCount };
};

// 🧭 Migrate guest cart → authenticated cart
export const migrateGuestCart = createAsyncThunk<
    CartItem[],
    void,
    { state: RootState; dispatch: AppDispatch }
>("cart/migrateGuestCart", async (_, { getState, rejectWithValue }) => {
    const { auth, cart } = getState();

    if (!auth.isAuthenticated) {
        return rejectWithValue("User not authenticated");
    }

    // Check both Redux state and localStorage
    if (cart.migrationCompleted || getMigrationStatus()) {
        console.log("Migration already completed, skipping");
        return cart.items;
    }

    const guestItems = loadGuestCart();
    if (guestItems.length === 0) {
        setMigrationStatus(true);
        return [];
    }

    try {
        const { data } = await cartService.migrateCart("/api/cart/migrate", guestItems);
        localStorage.removeItem("guest_cart");
        setMigrationStatus(true);
        return data.data.cart?.items || [];
    } catch (error) {
        const err = error as AxiosError<{ message?: string }>;
        return rejectWithValue(err.response?.data?.message || "Failed to migrate cart");
    }
});

// 🧭 Fetch cart for authenticated user
export const fetchUserCart = createAsyncThunk("cart/fetchUserCart", async () => {
    const { data } = await cartService.me("/api/cart/me");
    return data.data.cart.items as CartItem[];
});

// 🧭 Fetch only the cart count (for authenticated users)
export const fetchCartCount = createAsyncThunk("cart/fetchCartCount", async () => {
    const { data } = await cartService.count("/api/cart/count");
    console.log(data)
    return data.data.cart_count as number;
});

// 🧭 Add to cart
export const addToCart = createAsyncThunk<
    CartItem[],
    CartItem,
    { state: RootState; dispatch: AppDispatch }
>("cart/addToCart", async (item, { getState }) => {
    const { auth } = getState();

    if (auth.isAuthenticated) {
        try {
            const { data } = await cartService.addCart("/api/cart/add", item);
            //   toast({
            //     title: "Added to Cart",
            //     description: `${item.name} added to your cart.`,
            //   });
            const refreshed = await cartService.me("/api/cart/me");
            return refreshed.data.data.cart.items as CartItem[];
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;
            throw new Error(err.response?.data?.message || "Failed to add to cart.");
        }
    } else {
        // Guest cart logic
        const guestItems = loadGuestCart();
        const existing = guestItems.find(
            (i) =>
                i.id === item.id &&
                JSON.stringify(i.selected_variations) === JSON.stringify(item.selected_variations)
        );

        let newCart: CartItem[];
        if (existing) {
            newCart = guestItems.map((i) =>
                i.id === item.id &&
                    JSON.stringify(i.selected_variations) === JSON.stringify(item.selected_variations)
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
            );
            //   toast({
            //     title: "Updated Cart",
            //     description: `${item.name} quantity increased.`,
            //   });
        } else {
            newCart = [...guestItems, { ...item, quantity: 1 }];
            //   toast({
            //     title: "Added to Cart",
            //     description: `${item.name} added to your cart.`,
            //   });
        }

        saveGuestCart(newCart);
        return newCart;
    }
});

// 🧭 Remove item
export const removeFromCart = createAsyncThunk<
    CartItem[],
    { id: string; selected_variations?: Record<string, string> },
    { state: RootState }
>("cart/removeFromCart", async ({ id, selected_variations }, { getState }) => {
    const { auth, cart } = getState();

    const filtered = cart.items.filter(
        (item) =>
            !(
                item.id === id &&
                JSON.stringify(item.selected_variations) === JSON.stringify(selected_variations)
            )
    );
    if (auth.isAuthenticated) {
        try {
            await cartService.removeItem("/api/cart/remove-item", { id, selected_variations });
            const refreshed = await cartService.me("/api/cart/me");

            //   toast({
            //     title: "Removed from Cart",
            //     description: "Item removed successfully.",
            //     variant: "destructive",
            //   });
            return refreshed.data.data.cart.items as CartItem[];
        } catch {
            throw new Error("Failed to remove item from cart.");
        }
    } else {
        const filtered = cart.items.filter(
            (item) =>
                !(
                    item.id === id &&
                    JSON.stringify(item.selected_variations) === JSON.stringify(selected_variations)
                )
        );
        saveGuestCart(filtered);
        // toast({
        //   title: "Removed from Cart",
        //   description: "Item removed successfully.",
        //   variant: "destructive",
        // });
        return filtered;
    }
});

// 🧭 Clear Cart
// export const clearCart = createAsyncThunk<void, void, { state: RootState }>(
//   "cart/clearCart",
//   async (_, { getState }) => {
//     const { auth } = getState();

//     if (auth.isAuthenticated) {
//       await cartService.clearCart("/api/cart/clear");
//     } else {
//       localStorage.removeItem("guest_cart");
//     }

//     toast({
//       title: "Cart Cleared",
//       description: "All items removed from your cart.",
//       variant: "destructive",
//     });
//   }
// );

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        loadGuestCartState: (state) => {
            const guestItems = loadGuestCart();
            const { totalPrice, cartCount } = calculateTotals(guestItems);
            state.items = guestItems;
            state.cartCount = cartCount;
            state.totalPrice = totalPrice;
            clearMigrationStatus(); // Reset migration status when loading guest cart
        },
        clearMigration: () => {
            clearMigrationStatus(); // Manually clear migration status
        },
        updateQuantity: (
            state,
            action: PayloadAction<{
                id: string;
                quantity: number;
                selected_variations?: Record<string, string>;
            }>
        ) => {
            const { id, quantity, selected_variations } = action.payload;
            if (quantity <= 0) {
                state.items = state.items.filter(
                    (item) =>
                        !(
                            item.id === id &&
                            JSON.stringify(item.selected_variations) === JSON.stringify(selected_variations)
                        )
                );
            } else {
                state.items = state.items.map((item) =>
                    item.id === id &&
                        JSON.stringify(item.selected_variations) === JSON.stringify(selected_variations)
                        ? { ...item, quantity }
                        : item
                );
            }
            saveGuestCart(state.items);
            const { totalPrice, cartCount } = calculateTotals(state.items);
            state.cartCount = cartCount;
            state.totalPrice = totalPrice;

            //   toast({
            //     title: "Quantity Updated",
            //     description: "Item quantity updated.",
            //   });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserCart.fulfilled, (state, action) => {
                state.items = action.payload;
                const { totalPrice, cartCount } = calculateTotals(action.payload);
                state.cartCount = cartCount;
                state.totalPrice = totalPrice;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.items = action.payload;
                const { totalPrice, cartCount } = calculateTotals(action.payload);
                state.cartCount = cartCount;
                state.totalPrice = totalPrice;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = action.payload;
                const { totalPrice, cartCount } = calculateTotals(action.payload);
                state.cartCount = cartCount;
                state.totalPrice = totalPrice;
            })
            .addCase(migrateGuestCart.fulfilled, (state, action) => {
                state.items = action.payload;
                const { totalPrice, cartCount } = calculateTotals(action.payload);
                state.cartCount = cartCount;
                state.totalPrice = totalPrice;
            })
            .addCase(fetchCartCount.fulfilled, (state, action) => {
                state.cartCount = action.payload;
            })
            .addCase(fetchCartCount.rejected, (state) => {
                state.cartCount = 0;
            });
        // .addCase(clearCart.fulfilled, (state) => {
        //     state.items = [];
        //     state.cartCount = 0;
        //     state.totalPrice = 0;
        // });
    },
});

export const { loadGuestCartState, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;