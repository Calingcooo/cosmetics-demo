"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "../reduxHooks";
import { clearUser } from "@/redux/slice/userSlice";
import {
  login,
  register,
  restoreSession,
  logout as logoutAction,
  socialLogin,
  clearError
} from "@/redux/slice/authSlice";

export function useAuth() {
  const router = useRouter()
  const {
    initialized,
    loading,
    isAuthenticated,
    minimalUser,
    authError,
  } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logoutAction()).unwrap();

      // Clear all user-related data
      dispatch(clearUser());
      router.push("/")
    } catch (error) {
      // Even if API call fails, clear local state
      dispatch(clearUser());
    }
  }, [dispatch]);

  return {
    // State
    initialized,
    loading,
    isAuthenticated,
    minimalUser,
    authError,

    // Actions
    login: (data: { email: string; password: string }) =>
      dispatch(login(data)),

    register: (data: {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      confirm_password: string;
    }) => dispatch(register(data)),

    restoreSession: () => dispatch(restoreSession()),

    logout: () => handleLogout(),

    socialLogin: (provider: "google" | "facebook") =>
      dispatch(socialLogin(provider)),

    clearError: () => dispatch(clearError()),
  };
}