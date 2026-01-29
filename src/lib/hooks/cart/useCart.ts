import { useAppSelector, useAppDispatch } from "../reduxHooks";
import {
    fetchUserCart,
    addToCart,
    removeFromCart,
    loadGuestCartState,
    migrateGuestCart,
    fetchCartCount,
    updateItemCart,
    updateQuantityImmediate,
    selectCartItem,
    deselectCartItem,
    selectAllCartItems,
    deselectAllCartItems,
    toggleCartItemSelection,
    clearSelectedItems
} from "@/redux/slice/cartSlice";
import type { CartItem } from "@/app/types";

export function useCart() {
    const { items, selectedItems, cartCount, totalPrice, loading, error } = useAppSelector(
        (state) => state.cart
    );

    const dispatch = useAppDispatch();

    return {
        // State
        items,
        selectedItems,
        cartCount,
        totalPrice,
        loading,
        error,

        // Actions
        selectCartItem: (item: CartItem) => dispatch(selectCartItem(item)),

        deselectCartItem: (item: CartItem) => dispatch(deselectCartItem(item)),

        selectAllCartItems: () => dispatch(selectAllCartItems()),

        deselectAllCartItems: () => dispatch(deselectAllCartItems()),

        toggleCartItemSelection: (item: CartItem) => dispatch(toggleCartItemSelection(item)),

        clearSelectedItems: () => dispatch(clearSelectedItems()),
        
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
