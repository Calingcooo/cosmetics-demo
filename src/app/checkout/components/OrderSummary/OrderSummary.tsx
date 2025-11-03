// checkout/components/OrderSummary/OrderSummary.tsx
import React from "react";
import { User } from "@/app/types";
import Header from "../Header";
import OrderItems from "./OrderItems";
import PriceBreakdown from "./PriceBreakdown";
import CheckoutButton from "../CheckoutActions/CheckoutButton";

interface OrderSummaryProps {
  user: User | null;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ user }) => {
  return (
    <section className="bg-[theme(--card)] p-6 rounded-[theme(--radius)] shadow-[theme(--shadow-card)] border border-[theme(--border)] sticky top-8">
      <Header title="Order Summary" size="sm" />
      
      <OrderItems />
      <PriceBreakdown />
      <CheckoutButton user={user} />
      
      {/* Security Notice */}
      <div className="mt-4 text-center">
        <p className="text-[theme(--muted-foreground)] text-xs">
          🔒 Secure payment via HitPay
        </p>
      </div>
    </section>
  );
};

export default OrderSummary;