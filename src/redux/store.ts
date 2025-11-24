import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice"
import cartReducer from "./slice/cartSlice"
import userReducer from "./slice/userSlice"
import orderReducer from "./slice/orderSlice"
import contentReducer from "./slice/content.slice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        user: userReducer,
        order: orderReducer,
        content: contentReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;