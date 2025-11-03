// orders/components/LoadingStates/OrdersLoading.tsx
import React from "react";

const OrdersLoading: React.FC = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-[theme(--card)] p-6 rounded-[theme(--radius)] shadow-[theme(--shadow-card)] border border-[theme(--border)] animate-pulse"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="space-y-2">
              <div className="h-4 bg-[theme(--muted)] rounded w-32"></div>
              <div className="h-3 bg-[theme(--muted)] rounded w-24"></div>
            </div>
            <div className="h-6 bg-[theme(--muted)] rounded w-20"></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-[theme(--muted)] rounded"></div>
              <div className="w-8 h-8 bg-[theme(--muted)] rounded"></div>
              <div className="w-8 h-8 bg-[theme(--muted)] rounded"></div>
            </div>
            <div className="text-right space-y-1">
              <div className="h-4 bg-[theme(--muted)] rounded w-16"></div>
              <div className="h-3 bg-[theme(--muted)] rounded w-12"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersLoading;
