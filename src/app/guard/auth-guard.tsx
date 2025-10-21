"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import Bounce from "../components/ui/loading/Bounce";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { initialized, isAuthenticated } = useAuth();
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

  if (checking || !initialized) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <Bounce />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
