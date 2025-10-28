import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { authService } from "@/lib/api/authService";
import type { FormData, MiminalUser } from "@/app/types";

type AuthState = {
  initialized: boolean;
  loading: boolean;
  isAuthenticated: boolean;
  minimalUser: MiminalUser | null;
  authError: string | null;
};

const initialState: AuthState = {
  initialized: false,
  loading: false,
  isAuthenticated: false,
  minimalUser: null,
  authError: null
};

// Helper function to extract error message
const extractErrorMessage = (err: unknown): string => {
  if (err instanceof AxiosError) {
    return err.response?.data?.message || err.message;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return "An unknown error occurred";
};

// Restore session
export const restoreSession = createAsyncThunk(
  "auth/restoreSession", 
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (!res.ok) throw new Error("Not authenticated");

      const data = await res.json();
      return data.user as MiminalUser;
    } catch (err: unknown) {
      return rejectWithValue(extractErrorMessage(err));
    }
  }
);

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string }, 
    { rejectWithValue }
  ) => {
    try {
      const { data } = await authService.login("/api/auth/login", { email, password });
      if (!data.success) throw new Error(data.message);
      return data.data.user as MiminalUser;
    } catch (err: unknown) {
      return rejectWithValue(extractErrorMessage(err));
    }
  }
);

// Register
export const register = createAsyncThunk(
  "auth/register",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await authService.register("/api/auth/register", formData);
      if (!data.success) throw new Error(data.message);
      return data.data.user as MiminalUser;
    } catch (err: unknown) {
      return rejectWithValue(extractErrorMessage(err));
    }
  }
);

// Logout
export const logout = createAsyncThunk(
  "auth/logout", 
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout("/api/auth/logout");
    } catch (err: unknown) {
      // Even if logout fails, we still want to clear local state
      console.error("Logout error:", err);
      // Don't reject here, just log the error but still fulfill
    }
  }
);

// Social Login
export const socialLogin = createAsyncThunk(
  "auth/socialLogin",
  async (provider: "google" | "facebook") => {
    const url = `${process.env.NEXT_PUBLIC_BASE_API}/auth/${provider}`;
    window.open(url, "_self");
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.authError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // restoreSession
      .addCase(restoreSession.pending, (state) => {
        state.initialized = false;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.initialized = true;
        state.isAuthenticated = true;
        state.minimalUser = action.payload;
        state.authError = null;
      })
      .addCase(restoreSession.rejected, (state, action) => {
        state.initialized = true;
        state.isAuthenticated = false;
        state.minimalUser = null;
        state.authError = action.payload as string;
      })

      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.authError = null; // Clear previous errors
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.minimalUser = action.payload;
        state.authError = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.authError = action.payload as string;
      })

      // register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.authError = null; // Clear previous errors
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.minimalUser = action.payload;
        state.authError = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.authError = action.payload as string;
      })

      // logout
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.minimalUser = null;
        state.authError = null;
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;