"use client";

import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="rounded-lg border bg-[theme(--card)] text-[theme(--card-foreground)] shadow-[theme(--shadow-soft)] overflow-hidden border-[theme(--border)]/60 relative">
      {/* Shimmer effect background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[theme(--muted)] via-[#eee1e6] to-[theme(--muted)] animate-shimmer bg-[length:200%_100%]" />

      <div className="relative p-0">
        {/* Image skeleton */}
        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-[theme(--muted)]/80" />

        {/* Content skeleton */}
        <div className="p-4 space-y-3 bg-[theme(--card)] relative">
          <div className="space-y-2">
            <div className="h-4 w-3/4 bg-[theme(--muted)]/90 rounded" />
            <div className="h-5 w-1/3 bg-[theme(--muted)]/90 rounded" />
          </div>

          <div className="h-9 w-full bg-[theme(--muted)]/90 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
