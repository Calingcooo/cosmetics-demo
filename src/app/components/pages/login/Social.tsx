import React from "react";
import { LuFacebook } from "react-icons/lu";
import { SiGoogle } from "react-icons/si";

import { useAuth } from "@/app/hooks/useAuth";

const Social = () => {
  const { handleSocialLogin } = useAuth();
  return (
    <div className="flex items-center gap-1">
      <button
        className="h-10 capitalize px-4 py-2 border border-[theme(--input)] bg-[theme(--background)] hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)] w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-[theme(--offset-background)] transition-colors cursor-pointer"
        onClick={() => handleSocialLogin("google")}
      >
        <SiGoogle className="w-5 h-5" />
        google
      </button>
      <button
        className="h-10 capitalize px-4 py-2 border border-[theme(--input)] bg-[theme(--background)] hover:bg-[theme(--accent)] hover:text-[theme(--accent-foreground)] w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-[theme(--offset-background)] transition-colors cursor-pointer"
        onClick={() => handleSocialLogin("facebook")}
      >
        <LuFacebook className="w-5 h-5" />
        facebook
      </button>
    </div>
  );
};

export default Social;
