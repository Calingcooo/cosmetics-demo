// slices/orderSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { orderService } from "@/lib/api/orderService";
import type { Order, OrderItem } from "@/app/types";

interface OrderState {
    orders: Order[];
    currentOrder: Order | null;
    loading: boolean;
    error: string | null;
    lastFetched: number | null;
}

const initialState: OrderState = {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
    lastFetched: null
};

export const getOrders = createAsyncThunk(
    "order/getOrders",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await orderService.getOrders("/api/order/orders");
            console.log("Hitting")
            console.log(data)
            return data.data.orders as Order[];
        } catch (err: unknown) {
            const error = err as AxiosError<{ message?: string }>;
            return rejectWithValue(error.response?.data?.message || "Failed to fetch orders");
        }
    }
);

export const getOrderById = createAsyncThunk(
    "order/getOrderById",
    async (orderId: string, { rejectWithValue }) => {
        try {
            const { data } = await orderService.getOrder(`/api/orders/${orderId}`);
            return data.data.order as Order;
        } catch (err: unknown) {
            const error = err as AxiosError<{ message?: string }>;
            return rejectWithValue(error.response?.data?.message || "Failed to fetch order");
        }
    }
);

export const cancelOrder = createAsyncThunk(
    "order/cancelOrder",
    async (orderId: string, { rejectWithValue }) => {
        try {
            const { data } = await orderService.cancelOrder(`/api/orders/${orderId}/cancel`);
            return data.data.order as Order;
        } catch (err: unknown) {
            const error = err as AxiosError<{ message?: string }>;
            return rejectWithValue(error.response?.data?.message || "Failed to cancel order");
        }
    }
);

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        clearOrders: (state) => {
            state.orders = [];
            state.currentOrder = null;
            state.lastFetched = null;
            state.error = null;
        },
        clearCurrentOrder: (state) => {
            state.currentOrder = null;
        },
        clearOrderError: (state) => {
            state.error = null;
        },
        addOrder: (state, action) => {
            state.orders.unshift(action.payload);
        },
        updateOrderInList: (state, action) => {
            const index = state.orders.findIndex(order => order.id === action.payload.id);
            if (index !== -1) {
                state.orders[index] = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // getOrders
            .addCase(getOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
                state.lastFetched = Date.now();
                state.error = null;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // getOrderById
            .addCase(getOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrder = action.payload;
                state.error = null;
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // cancelOrder
            .addCase(cancelOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.loading = false;

                // // Update current order if it's the one being cancelled
                // if (state.currentOrder && state.currentOrder.id === action.payload.id) {
                //     state.currentOrder = action.payload;
                // }

                // // Update order in the list
                // const index = state.orders.findIndex(order => order.id === action.payload.id);
                // if (index !== -1) {
                //     state.orders[index] = action.payload;
                // }

                state.error = null;
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const {
    clearOrders,
    clearCurrentOrder,
    clearOrderError,
    addOrder,
    updateOrderInList
} = orderSlice.actions;

export default orderSlice.reducer;