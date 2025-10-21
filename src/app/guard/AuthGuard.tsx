"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import Bounce from "../components/ui/loading/Bounce";

interface AuthGuardProps {
  children: React.ReactNode;
  redirectPath?: string;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  redirectPath = "/",
}) => {
  const { isAuthenticated, initialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!initialized) return;
    
    if (!isAuthenticated) {
      router.replace(redirectPath);
    }
  }, [initialized, isAuthenticated, redirectPath, router]);

  if (!initialized) {
    // Still checking token from storage
    return <Bounce />;
  }

  // Only show children if initialized
  return <>{isAuthenticated ? children : null}</>;
};

export default AuthGuard;
