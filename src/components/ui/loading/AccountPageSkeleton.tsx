"use client";

import React from "react";

const MyAccountSkeleton = () => {
  const tabs = [
    { id: "personal", label: "Personal Info" },
    { id: "shipping", label: "Shipping Details" },
    { id: "payment", label: "Payment Method" },
  ];

  return (
    <div className="flex-1 flex flex-col animate-pulse">
      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="h-10 w-1/3 bg-[theme(--muted)] rounded-md mb-8" />

        {/* Tabs */}
        <div className="grid grid-cols-3 gap-2 mb-8">
          {tabs.map((tab) => (
            <div key={tab.id} className="h-8 bg-[theme(--muted)] rounded-md" />
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-4 border rounded-md p-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-10 w-full bg-[theme(--muted)] rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAccountSkeleton;
