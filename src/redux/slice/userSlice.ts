// slices/userSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { userService } from "@/lib/api/userService";
import type { User } from "@/app/types";

interface UserState {
  user: User | null;
  initialUser: User | null;
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

const initialState: UserState = {
  user: null,
  initialUser: null,
  loading: false,
  error: null,
  lastFetched: null
};

// Match your context API functions exactly
export const getMe = createAsyncThunk(
  "user/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await userService.getUser("/api/user/me");
      return data.user as User;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user");
    }
  }
);

export const updateMe = createAsyncThunk(
  "user/updateMe",
  async (updatedData: Partial<User>, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { user: UserState };
      const { initialUser } = state.user;

      // Check for changes (matching your context logic exactly)
      const hasChanges = Object.keys(updatedData).some((key) => {
        const k = key as keyof User;
        return updatedData[k] !== initialUser?.[k];
      });

      if (!hasChanges) {
        return { user: state.user.user, skipped: true };
      }

      const { data } = await userService.updateUser("/api/user/update", updatedData);
      return { user: data.user as User, skipped: false };
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      return rejectWithValue(error.response?.data?.message || "Failed to update user");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.initialUser = null;
      state.lastFetched = null;
      state.error = null;
    },
    clearUserError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // getMe
      .addCase(getMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.initialUser = action.payload;
        state.lastFetched = Date.now();
        state.error = null;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // updateMe
      .addCase(updateMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMe.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload.skipped) {
          state.user = action.payload.user;
          state.initialUser = action.payload.user;
          state.lastFetched = Date.now();
        }
        state.error = null;
      })
      .addCase(updateMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearUser, clearUserError } = userSlice.actions;
export default userSlice.reducer;