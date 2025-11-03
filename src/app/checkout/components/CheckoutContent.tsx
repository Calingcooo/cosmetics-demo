"use client";

import React from "react";
import { useUser } from "@/lib/hooks/user/useUser";
import CustomerInfo from "./CustomerInfo/CustomerInfo";
import OrderSummary from "./OrderSummary/OrderSummary";
import CheckoutLoading from "./LoadingStates/CheckoutLoading";

const CheckoutContent: React.FC = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <CheckoutLoading />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Order Details */}
      <div className="lg:col-span-2 space-y-6">
        <CustomerInfo user={user} />
      </div>

      {/* Order Summary */}
      <div className="space-y-6">
        <OrderSummary user={user} />
      </div>
    </div>
  );
};

export default CheckoutContent;