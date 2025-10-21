"use client";

import { createContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

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
      setAuthError("Email and password are required.");
      setLoading(false);
      setLoadingCallback?.(false);
      return { success: false, message: "Email and password are required." };
    }

    try {
      const endpoint = isSignUp ? "/auth/register" : "/auth/login";

      const res = await publicAxios.post(endpoint, formData, {
        withCredentials: true,
      });

      const { token, user } = res.data;
      if (token) {
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
    } catch (err: unknown) {
      let message = "An unknown error occurred";

      if (err instanceof AxiosError) {
        // AxiosError type is safe to access response
        message = err.response?.data?.message || message;
      } else if (err instanceof Error) {
        message = err.message;
      }

      setAuthError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
      setLoadingCallback?.(false);
    }
  };

  const handleSocialLogin = (social: "google" | "facebook") => {
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const url = `${process.env.NEXT_PUBLIC_BASE_API}/auth/${social}`;

    const popup = window.open(
      url,
      "_blank",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    if (!popup) {
      console.error("Popup blocked!");
      return;
    }

    // Listen for messages from the popup
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin !== process.env.NEXT_PUBLIC_BASE_API &&
        event.origin !== "http://localhost:3001"
      )
        return;

      const { success, token, user } = event.data;
      if (success) {
        sessionStorage.setItem("token", token);

        setUser(user);
        setIsAuthenticated(true);

        // Close the popup
        popup.close();
        router.push("/");
      }
    };

    window.addEventListener("message", handleMessage, { once: true });
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
