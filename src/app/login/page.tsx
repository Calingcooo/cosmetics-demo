// app/login/page.tsx
"use client";

import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import LoginPage from "./LoginPage";
import LoginFormSkeleton from "@/components/ui/loading/LoginFormSkeleton";

export default function LoginPageLayout() {
  const { initialized, isAuthenticated } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (initialized && isAuthenticated) {
      router.push("/");
    }
  }, [initialized, isAuthenticated, router]);

  if (!initialized) {
    return <LoginFormSkeleton />;
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <Suspense fallback={<LoginFormSkeleton />}>
      <LoginPage />
    </Suspense>
  );
}
