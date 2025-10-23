// app/login/page.tsx
"use client";

import { Suspense } from "react";
import LoginPage from "./LoginPage";
import Bounce from "@/components/ui/loading/Bounce";

export default function LoginPageLayout() {
  return (
    <Suspense fallback={<Bounce />}>
      <LoginPage />
    </Suspense>
  );
}