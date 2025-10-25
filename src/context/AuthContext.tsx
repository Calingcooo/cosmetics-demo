"use client";

import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

import type { ReactNode, SetStateAction } from "react";
import type { FormData, User } from "../app/types";

import { useToast } from "../app/hooks/useToast";

import { authService } from "@/lib/api/authService";

type AuthContextType = {
  initialized: boolean;
  loading: boolean;
  isAuthenticated: boolean;
  minimalUser: Partial<User> | null;
  authError: string | null;
  setAuthError: React.Dispatch<SetStateAction<string | null>>;
  hanndleSubmit: (
    formData: FormData,
    e: React.FormEvent,
    isSignUp: string
  ) => void;
  handleSocialLogin: (social: "google" | "facebook") => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [minimalUser, setMinimalUser] = useState<Partial<User | null>>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { addToast } = useToast();

  const router = useRouter();

  // ✅ On mount: restore user
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Not authenticated");

        const data = await res.json();

        setMinimalUser(data.user);
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
        router.push("/login");
      } finally {
        setInitialized(true);
      }
    };

    restoreSession();
  }, []);

  const hanndleSubmit = async (
    formData: FormData,
    e: React.FormEvent,
    isSignUp: string,
    setLoadingCallback?: (value: boolean) => void
  ) => {
    e.preventDefault();
    setLoading(true);
    setLoadingCallback?.(true);

    if (formData?.email.trim() === "" || formData?.password.trim() === "") {
      setAuthError("Email and password are required.");
      setLoading(false);
      setLoadingCallback?.(false);
    }

    try {
      const { data } = isSignUp
        ? await authService.register("/api/auth/register", { ...formData })
        : await authService.login("/api/auth/login", { ...formData });

      if (!data.success) {
        throw new Error(data.message || "Authentication failed");
      }

      setMinimalUser(data.user);
      setIsAuthenticated(true);

      addToast({
        title: isSignUp ? "Account Created" : "Welcome Back!",
        description: isSignUp
          ? "Your account has been created successfully."
          : `Welcome back, ${data.user.first_name || "User"}!`,
      });

      // Wait for the user to be set before redirecting
      setTimeout(() => {
        router.push("/");
      }, 50);
    } catch (err: unknown) {
      const message =
        err instanceof AxiosError
          ? err.response?.data?.message
          : err instanceof Error
          ? err.message
          : "An unknown error occurred";

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
          setMinimalUser(user);
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
    setMinimalUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    router.push("/");
    addToast({
      title: "Session ended",
      description: "You've been logged out of your account.",
      variant: "default",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        initialized,
        loading,
        isAuthenticated,
        minimalUser,
        authError,
        setAuthError,
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
