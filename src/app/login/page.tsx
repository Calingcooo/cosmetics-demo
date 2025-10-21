"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import clsx from "clsx";

import { useAuth } from "../hooks/useAuth";
import Social from "../components/pages/login/Social";
import LoginForm from "../components/pages/login/LoginForm";
import CreateAccountForm from "../components/pages/login/CreateAccountForm";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const modeParam = searchParams.get("mode") || "login";

  // keep mode synced with URL
  const [mode, setMode] = useState<"login" | "signup">(
    modeParam as "login" | "signup"
  );

  const { loading, hanndleSubmit } = useAuth();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  // Update mode when URL param changes
  useEffect(() => {
    setMode(modeParam as "login" | "signup");
  }, [modeParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    const newMode = mode === "login" ? "signup" : "login";
    router.replace(`/login?mode=${newMode}`);
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
              {mode === "signup" ? "Create an account" : "Welcome back"}
            </h1>
            <h3 className="text-center p-6 pt-2">
              {mode === "signup"
                ? "Sign up to start shopping"
                : "Enter your credentials to access your account"}
            </h3>

            {/* Social Login */}
            <Social />
          </div>

          <div className="relative my-5">
            {/* Divider */}
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[theme(--border)]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[theme(--card)] px-2 text-[theme(--muted-foreground)]">
                Or continue with
              </span>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) =>
              hanndleSubmit(formData, e, mode === "signup" ? "signup" : "")
            }
            className="gap-4"
          >
            {mode === "signup" ? (
              <CreateAccountForm formData={formData} handleChange={handleChange} />
            ) : (
              <LoginForm formData={formData} handleChange={handleChange} />
            )}

            {/* Forgot Password */}
            {mode === "login" && (
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
              {loading
                ? "Loading..."
                : mode === "signup"
                ? "Create Account"
                : "Sign In"}
            </button>
          </form>

          {/* Toggle mode */}
          <div className="text-center text-sm mt-2">
            <button
              onClick={toggleMode}
              className="text-[theme(--primary)] hover:underline underline-offset-1 cursor-pointer"
            >
              {mode === "signup"
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
