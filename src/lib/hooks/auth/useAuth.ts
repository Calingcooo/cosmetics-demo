"use client";

import { useAppSelector, useAppDispatch } from "../reduxHooks";
import {
  login,
  register,
  restoreSession,
  logout as logoutAction,
  socialLogin,
  clearError
} from "@/redux/slice/authSlice";

export function useAuth() {
  const {
    initialized,
    loading,
    isAuthenticated,
    minimalUser,
    authError,
  } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

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

    logout: () => dispatch(logoutAction()),

    socialLogin: (provider: "google" | "facebook") =>
      dispatch(socialLogin(provider)),

    clearError: () => dispatch(clearError()),
  };
}