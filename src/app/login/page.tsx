"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";

import { useAuth } from "../hooks/useAuth";

import Social from "../components/pages/login/Social";
import LoginForm from "../components/pages/login/LoginForm";
import CreateAccountForm from "../components/pages/login/CreateAccountForm";

const LoginPage = () => {
  const { loading, handleLogin } = useAuth();
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="flex items-center justify-center py-20 bg-[theme(--gradient-hero)]">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-2">
          <h1
            className="text-3xl font-bold bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-primary)" }}
          >
            Demo
          </h1>
        </div>

        <div className="border border-[theme(--border)]/40 p-5 shadow-[theme(--soft)] rounded-lg bg-[theme(--card)] text-[theme(--card-foreground)] shadow-sm">
          {/* Header */}
          <div>
            <h1 className="text-2xl text-center font-semibold leading-none tracking-tight">
              {isSignUp ? "Create an account" : "Welcome back"}
            </h1>
            <h3 className="text-center p-6 pt-2">
              {isSignUp
                ? "Sign up to start shopping"
                : "Enter your credentials to access your account"}
            </h3>

            {/* Social Login */}
            <Social />
          </div>

          <div className="relative my-5">
            {/* Horizontal line */}
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[theme(--border)]" />
            </div>

            {/* Center text */}
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[theme(--card)] px-2 text-[theme(--muted-foreground)]">
                Or continue with
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={(e) => handleLogin(formData, e, isSignUp ? "signup" : "")}  className="gap-4">
            {isSignUp ? <CreateAccountForm formData={formData} handleChange={handleChange}/> : <LoginForm formData={formData} handleChange={handleChange}/>}

            {/* Forgot Password */}
            {!isSignUp && (
              <div className="text-right my-2">
                <button
                  type="button"
                  className="text-sm text-[theme(--primary)] hover:underline underline-offset-1 cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={clsx(
                "w-full h-10 rounded-md bg-[theme(--primary)] text-[theme(--primary-foreground)] font-medium hover:opacity-90 transition cursor-pointer",
                loading && "opacity-60"
              )}
            >
              {loading ? "Loading..." : isSignUp ? "Create Account" : "Sign In"}
            </button>
          </form>

          <div className="text-center text-sm mt-2">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[theme(--primary)] hover:underline underline-offset-1 cursor-pointer"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
