"use client";

import React from "react";

const CartPageSkeleton = () => {
  return (
    <div className="flex-1 container mx-auto px-4 py-8 flex flex-col">
      <div className="animate-pulse">
        <div className="h-9 w-48 bg-[theme(--muted)] rounded mb-8"></div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items (Left) */}
          <div className="lg:col-span-2 space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex gap-4 bg-[theme(--card)] p-4 rounded-lg border border-[theme(--border)]/40 shadow-sm"
              >
                {/* Image */}
                <div className="w-24 h-24 bg-[theme(--muted)] rounded"></div>

                {/* Details */}
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-[theme(--muted)] rounded"></div>
                  <div className="h-3 w-1/3 bg-[theme(--muted)] rounded"></div>
                  <div className="h-3 w-1/2 bg-[theme(--muted)] rounded"></div>
                  <div className="h-4 w-16 bg-[theme(--muted)] rounded"></div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col items-end justify-between">
                  <div className="h-10 w-10 bg-[theme(--muted)] rounded"></div>
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 bg-[theme(--muted)] rounded"></div>
                    <div className="h-5 w-5 bg-[theme(--muted)] rounded"></div>
                    <div className="h-10 w-10 bg-[theme(--muted)] rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary (Right) */}
          <div className="lg:col-span-1 bg-[theme(--card)] p-6 rounded-lg border border-[theme(--border)]/40 shadow-sm space-y-4 h-fit sticky top-4">
            <div className="h-6 w-40 bg-[theme(--muted)] rounded mb-4"></div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="h-3 w-20 bg-[theme(--muted)] rounded"></div>
                <div className="h-3 w-12 bg-[theme(--muted)] rounded"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-3 w-24 bg-[theme(--muted)] rounded"></div>
                <div className="h-3 w-12 bg-[theme(--muted)] rounded"></div>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <div className="h-4 w-12 bg-[theme(--muted)] rounded"></div>
                <div className="h-4 w-16 bg-[theme(--muted)] rounded"></div>
              </div>
            </div>
            <div className="h-11 w-full bg-[theme(--muted)] rounded mt-4"></div>
            <div className="h-10 w-full bg-[theme(--muted)] rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPageSkeleton;
