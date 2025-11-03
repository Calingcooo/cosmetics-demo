import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice"
import cartReducer from "./slice/cartSlice"
import userReducer from "./slice/userSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        user: userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;