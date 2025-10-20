"use client";

import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { LoginResponse } from "../types";

import { useToast } from "../hooks/useToast";

type User = {
  email: string;
  password: string;
  rememberMe: boolean;
} | null;

type AuthContextType = {
  user: User;
  authError: string | null;
  login: (formData: User) => Promise<LoginResponse>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const { addToast } = useToast();

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (formData: User): Promise<LoginResponse> => {
    if (formData?.email.trim() === "" || formData?.password.trim() === "") {
      setAuthError("Email and password is required.");
      return { success: false, message: "Email and password is required." };
    }
    try {
      localStorage.setItem("user", JSON.stringify(formData));
      localStorage.setItem("authenticated", JSON.stringify(true));

      //   if (formData?.rememberMe) {
      //     localStorage.setItem("email", JSON.stringify(formData?.email));
      //   } else {
      //     localStorage.removeItem("email");
      //   }

      setUser(formData);
      setIsAuthenticated(true);
      addToast({
        title: "Success",
        description: "Login success!",
        variant: "default",
      });
      return { success: true, message: "Login success!" };
    } catch (error: any) {
      console.error(error);
      setAuthError(error?.message);
      return { success: false, message: error?.message };
    } finally {
      setAuthError(null);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, authError, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
