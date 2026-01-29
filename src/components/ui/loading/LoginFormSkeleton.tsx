import React from "react";

const LoginFormSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto p-5 border rounded-lg bg-[theme(--card)] animate-pulse space-y-6 my-20">
      {/* Logo */}
      <div className="h-10 w-32 bg-[theme(--muted)] rounded-md mx-auto" />

      {/* Header */}
      <div className="space-y-2">
        <div className="h-6 w-40 bg-[theme(--muted)] rounded-md mx-auto" />
        <div className="h-4 w-64 bg-[theme(--muted)] rounded-md mx-auto mt-2" />
      </div>

      {/* Social Buttons */}
      <div className="flex flex-row gap-2">
        <div className="h-10 bg-[theme(--muted)] rounded-md w-full" />
        <div className="h-10 bg-[theme(--muted)] rounded-md w-full" />
      </div>

      {/* Divider */}
      <div className="relative mt-4 mb-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[theme(--border)]" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[theme(--card)] px-2 text-[theme(--muted-foreground)]">
            Or continue with
          </span>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div className="h-10 bg-[theme(--muted)] rounded-md" />
        <div className="h-10 bg-[theme(--muted)] rounded-md" />
        {/* Optional extra fields for signup */}
        <div className="h-10 bg-[theme(--muted)] rounded-md" />
        <div className="h-10 bg-[theme(--muted)] rounded-md" />
      </div>

      {/* Submit Button */}
      <div className="h-10 bg-[theme(--muted)] rounded-md mt-4" />

      {/* Toggle Mode Link */}
      <div className="h-4 w-48 bg-[theme(--muted)] rounded-md mx-auto mt-3" />
    </div>
  );
};

export default LoginFormSkeleton;
