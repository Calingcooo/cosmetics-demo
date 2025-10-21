"use client";

import { createContext, useState } from "react";
import { useRouter } from "next/navigation";

import type { ReactNode } from "react";
import type { LoginResponse, LoginFormData } from "../types";

import { publicAxios } from "../guard/axios-interceptor";
import { useToast } from "../hooks/useToast";

type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
} | null;

type AuthContextType = {
  loading: boolean;
  isAuthenticated: boolean;
  user: User;
  authError: string | null;
  handleLogin: (
    formData: LoginFormData,
    e: React.FormEvent,
    isSignUp: string
  ) => Promise<LoginResponse>;
  handleSocialLogin: (social: "google" | "facebook") => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { addToast } = useToast();

  const router = useRouter();

  const handleLogin = async (
    formData: LoginFormData,
    e: React.FormEvent,
    isSignUp: string,
    setLoadingCallback?: (value: boolean) => void
  ): Promise<LoginResponse> => {
    e.preventDefault();
    setLoading(true);
    setLoadingCallback?.(true);

    if (formData?.email.trim() === "" || formData?.password.trim() === "") {
      setAuthError("Email and password is required.");
      return { success: false, message: "Email and password is required." };
    }
    try {
      const endpoint = isSignUp ? "/auth/register" : "/auth/login";

      const res = await publicAxios.post(endpoint, formData, {
        withCredentials: true, // allow cookies
      });

      const { token, user } = res.data;
      if (token) {
        // store token in sessionStorage
        sessionStorage.setItem("token", token);
      }

      addToast({
        title: "Success",
        description: isSignUp
          ? "Account created successfully!"
          : `Welcome back, ${user.first_name || "user"}!`,
        variant: "default",
      });

      router.push("/");

      return { success: true, message: "Login success!" };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        setAuthError(error.message);
        return { success: false, message: error.message };
      } else {
        console.error(error);
        setAuthError("An unknown error occurred");
        return { success: false, message: "An unknown error occurred" };
      }
    } finally {
      setAuthError(null);
      setLoading(false);
    }
  };

  const handleSocialLogin = (social: "google" | "facebook") => {
    switch (social) {
      case "google":
        window.open(
          `${process.env.NEXT_PUBLIC_BASE_API}/auth/google`,
          "_blank",
          "width=500,height=600"
        );
        break;
      case "facebook":
        window.open(
          `${process.env.NEXT_PUBLIC_BASE_API}/auth/facebook`,
          "_blank",
          "width=500,height=600"
        );
      default:
        break;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        isAuthenticated,
        user,
        authError,
        handleLogin,
        handleSocialLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
