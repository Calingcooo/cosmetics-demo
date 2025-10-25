"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/hooks/useAuth";
import MyAccountSkeleton from "@/components/ui/loading/AccountPageSkeleton";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { minimalUser, initialized, isAuthenticated } = useAuth();
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (initialized) {
      if (!isAuthenticated) {
        router.replace("/login?redirect=account");
      } else {
        setChecking(false);
      }
    }
  }, [initialized, isAuthenticated, router]);

  if (checking || !initialized || !minimalUser) {
    return <MyAccountSkeleton />;
  }

  return <>{children}</>;
};

export default AuthGuard;
