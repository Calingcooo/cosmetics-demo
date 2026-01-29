"use client";

import { useAppSelector, useAppDispatch } from "../reduxHooks";
import {
    getOrders,
    getOrderById,
    cancelOrder,
    clearOrders,
    clearCurrentOrder,
    clearOrderError,
    addOrder,
    updateOrderInList
} from "@/redux/slice/orderSlice";
import type { Order } from "@/app/types";

export function useOrders() {
    const { orders, currentOrder, loading, error, lastFetched } = useAppSelector(
        (state) => state.order
    );

    const dispatch = useAppDispatch();

    return {
        // State
        orders,
        currentOrder,
        loading,
        error,
        lastFetched,

        // Async Actions
        getOrders: () => dispatch(getOrders()),
        getOrderById: (orderId: string) => dispatch(getOrderById(orderId)),
        cancelOrder: (orderId: string) => dispatch(cancelOrder(orderId)),

        // Sync Actions
        clearOrders: () => dispatch(clearOrders()),
        clearCurrentOrder: () => dispatch(clearCurrentOrder()),
        clearOrderError: () => dispatch(clearOrderError()),
        addOrder: (order: Order) => dispatch(addOrder(order)),
        updateOrderInList: (order: Order) => dispatch(updateOrderInList(order))
    };
}