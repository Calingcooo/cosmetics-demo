"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { LuFacebook } from "react-icons/lu";
import { SiGoogle } from "react-icons/si";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  const LoginInputs = () => {
    return (
      <div className="space-y-4">
        {/* Email */}
        <div className="space-y-1">
          <label
            htmlFor="email"
            className="text-sm capitalize font-medium leading-none"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="example@email.com"
            className="bg-[theme(--muted)]/50 flex h-10 w-full rounded-md border border-input px-3 py-2 text-base ring-offset-[theme(--background)] file:border-0 file:bg-transparent placeholder:text-[theme(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[theme(--ring)] focus-visible:ring-offset-2 md:text-sm"
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label
            htmlFor="password"
            className="text-sm capitalize font-medium leading-none"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="bg-[theme(--muted)]/50 flex h-10 w-full rounded-md border border-input px-3 py-2 text-base ring-offset-[theme(--background)] file:border-0 file:bg-transparent placeholder:text-[theme(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[theme(--ring)] focus-visible:ring-offset-2 md:text-sm"
          />
        </div>
      </div>
    );
  };

  const CreateAccountInputs = () => {
    return (
      <div className="space-y-4">
        {/* First Name */}
        <div className="space-y-1">
          <label
            htmlFor="first_name"
            className="text-sm capitalize font-medium leading-none"
          >
            first name
          </label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            placeholder="John"
            className="bg-[theme(--muted)]/50 flex h-10 w-full rounded-md border border-input px-3 py-2 text-base ring-offset-[theme(--background)] file:border-0 file:bg-transparent placeholder:text-[theme(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[theme(--ring)] focus-visible:ring-offset-2 md:text-sm"
          />
        </div>

        {/* Last Name */}
        <div className="space-y-1">
          <label
            htmlFor="last_name"
            className="text-sm capitalize font-medium leading-none"
          >
            first name
          </label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            placeholder="Doe"
            className="bg-[theme(--muted)]/50 flex h-10 w-full rounded-md border border-input px-3 py-2 text-base ring-offset-[theme(--background)] file:border-0 file:bg-transparent placeholder:text-[theme(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[theme(--ring)] focus-visible:ring-offset-2 md:text-sm"
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label
            htmlFor="email"
            className="text-sm capitalize font-medium leading-none"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="example@email.com"
            className="bg-[theme(--muted)]/50 flex h-10 w-full rounded-md border border-input px-3 py-2 text-base ring-offset-[theme(--background)] file:border-0 file:bg-transparent placeholder:text-[theme(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[theme(--ring)] focus-visible:ring-offset-2 md:text-sm"
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label
            htmlFor="password"
            className="text-sm capitalize font-medium leading-none"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="bg-[theme(--muted)]/50 flex h-10 w-full rounded-md border border-input px-3 py-2 text-base ring-offset-[theme(--background)] file:border-0 file:bg-transparent placeholder:text-[theme(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[theme(--ring)] focus-visible:ring-offset-2 md:text-sm"
          />
        </div>
      </div>
    );
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
            <div className="flex items-center gap-1">
              <button className="h-10 capitalize px-4 py-2 border border-[theme(--input)] bg-[theme(--background)] hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)] w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-[theme(--offset-background)] transition-colors cursor-pointer">
                <SiGoogle className="w-5 h-5" />
                google
              </button>
              <button className="h-10 capitalize px-4 py-2 border border-[theme(--input)] bg-[theme(--background)] hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)] w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-[theme(--offset-background)] transition-colors cursor-pointer">
                <LuFacebook className="w-5 h-5" />
                facebook
              </button>
            </div>
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
          <form action="" className="gap-4">
            {isSignUp ? <CreateAccountInputs /> : <LoginInputs />}

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
              className={clsx(
                "w-full h-10 rounded-md bg-[theme(--primary)] text-[theme(--primary-foreground)] font-medium hover:opacity-90 transition cursor-pointer",
                isSignUp && "mt-4"
              )}
            >
              {isSignUp ? "Create Account" : "Sign In"}
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
