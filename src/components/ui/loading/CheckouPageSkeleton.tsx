import React from "react";

const CheckouPageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-[theme(--background)]">
      {/* Header Skeleton */}
      <div className="border-b border-[theme(--border)] bg-[theme(--card)]">
        <div className="container mx-auto px-4 py-4">
          <div className="animate-pulse">
            <div className="h-8 bg-[theme(--muted)] rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-[theme(--muted)] rounded w-1/6"></div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Order Summary Skeleton */}
          <div className="space-y-6">
            <div className="bg-[theme(--card)] p-6 rounded-lg border border-[theme(--border)] animate-pulse">
              <div className="h-6 bg-[theme(--muted)] rounded w-1/3 mb-4"></div>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-3 border-b border-[theme(--border)]"
                >
                  <div className="w-12 h-12 bg-[theme(--muted)] rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-[theme(--muted)] rounded w-3/4"></div>
                    <div className="h-3 bg-[theme(--muted)] rounded w-1/2"></div>
                  </div>
                  <div className="h-4 bg-[theme(--muted)] rounded w-12"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout Actions Skeleton */}
          <div className="space-y-6">
            <div className="bg-[theme(--card)] p-6 rounded-lg border border-[theme(--border)] animate-pulse">
              <div className="h-6 bg-[theme(--muted)] rounded w-1/2 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-[theme(--muted)] rounded w-full"></div>
                <div className="h-4 bg-[theme(--muted)] rounded w-3/4"></div>
              </div>
            </div>
            <div className="h-12 bg-[theme(--muted)] rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckouPageSkeleton;
