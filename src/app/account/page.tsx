"use client"

import { Suspense } from "react";
import MyAccountPage from "./MyAccountPage";
import MyAccountSkeleton from "@/components/ui/loading/AccountPageSkeleton";

export default function AccountLayout() {
  return (
      <Suspense fallback={<MyAccountSkeleton />}>
        <MyAccountPage />
      </Suspense>
  );
}