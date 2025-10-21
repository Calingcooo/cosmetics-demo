"use client";

import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

import type { ReactNode } from "react";
import type { AuthResponse, FormData } from "../types";

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
  initialized: boolean;
  loading: boolean;
  isAuthenticated: boolean;
  user: User;
  authError: string | null;
  hanndleSubmit: (
    formData: FormData,
    e: React.FormEvent,
    isSignUp: string
  ) => Promise<AuthResponse>;
  handleSocialLogin: (social: "google" | "facebook") => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { addToast } = useToast();

  const router = useRouter();

  useEffect(() => {
    const storedToken =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch {
        console.error("Failed to parse stored user");
        localStorage.removeItem("user");
      }
    }

    setInitialized(true);
  }, []);

  const hanndleSubmit = async (
    formData: FormData,
    e: React.FormEvent,
    isSignUp: string,
    setLoadingCallback?: (value: boolean) => void
  ): Promise<AuthResponse> => {
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

      if (token && user) {
        // ✅ Save to storage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // ✅ Update React state
        setUser(user);
        setIsAuthenticated(true);

        addToast({
          title: "Success",
          description: isSignUp
            ? "Account created successfully!"
            : `Welcome back, ${user.first_name || "user"}!`,
          variant: "default",
        });

        // Wait for state to update, THEN redirect
        setTimeout(() => {
          router.push("/");
        }, 50);
      }
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

  const handleSocialLogin = async (social: "google" | "facebook") => {
    try {
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

      // Listen for message from popup
      const handleMessage = (event: MessageEvent) => {
        // if (event.origin !== window.origin) return;

        const { success, token, user } = event.data;
        if (success) {
          sessionStorage.setItem("token", token);
          setUser(user);
          setIsAuthenticated(true);
          router.push("/");
        }
      };

      window.addEventListener("message", handleMessage, { once: true });
    } catch (error) {
      console.error("Social login error: ", error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    addToast({
      title: "Session ended",
      description: "You’ve been logged out of your account.",
      variant: "default",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        initialized,
        loading,
        isAuthenticated,
        user,
        authError,
        hanndleSubmit,
        handleSocialLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
