"use client";

import { useEffect, useState } from "react";
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
  const { isAuthenticated, loading } = useAuth();
  const [checking, setChecking] = useState(true); // local loading state
  const router = useRouter();

  useEffect(() => {
    // Wait until AuthContext finishes loading
    if (!loading) {
      setChecking(false);

      // If not authenticated, redirect to login/root
      if (!isAuthenticated) {
        router.replace(redirectPath);
      }
    }
  }, [loading, isAuthenticated, redirectPath, router]);

  if (loading || checking) {
    return <Bounce />;
  }

  // If authenticated, render protected content
  return <>{children}</>;
};

export default AuthGuard;
