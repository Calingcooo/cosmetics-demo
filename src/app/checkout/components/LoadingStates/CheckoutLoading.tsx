import React from "react";

const CheckoutLoading: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div className="w-12 h-12 border-4 border-[theme(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-[theme(--muted-foreground)]">Loading checkout...</p>
    </div>
  );
};

export default CheckoutLoading;
