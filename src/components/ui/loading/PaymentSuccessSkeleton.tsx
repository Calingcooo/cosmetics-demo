import React from "react";

export const PaymentSuccessSkeleton = () => {
  return (
    <div className="flex-1 bg-[theme(--background)] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[theme(--card)] rounded-lg border border-[theme(--border)]/40 shadow-lg p-6 text-center animate-pulse">
        {/* Spinner circle */}
        <div className="w-16 h-16 border-4 border-[theme(--primary)] border-t-transparent rounded-full mx-auto mb-4 animate-spin" />

        {/* Title placeholder */}
        <div className="h-6 bg-[theme(--muted)] rounded w-2/3 mx-auto mb-3" />

        {/* Subtitle placeholder */}
        <div className="h-4 bg-[theme(--muted)] rounded w-3/4 mx-auto mb-6" />

        {/* Button placeholders */}
        <div className="space-y-3">
          <div className="h-10 bg-[theme(--muted)] rounded w-full" />
          <div className="h-10 bg-[theme(--muted)] rounded w-full" />
        </div>
      </div>
    </div>
  );
};
