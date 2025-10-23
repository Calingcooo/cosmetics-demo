// app/login/page.tsx
"use client";

import { Suspense } from "react";
import LoginPage from "./LoginPage";
import LoginFormSkeleton from "@/components/ui/loading/LoginFormSkeleton";

export default function LoginPageLayout() {
  return (
    <Suspense fallback={<LoginFormSkeleton />}>
      <LoginPage />
    </Suspense>
  );
}