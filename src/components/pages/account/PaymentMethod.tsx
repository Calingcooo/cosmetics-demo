import React from "react";
import Header from "./Header";

const PaymentMethod = () => {
  return (
    <div className="space-y-4 bg-[theme(--card)] p-5">
      <Header
        title="Payment Method"
        subtitle="Update your payment details here."
      />
    </div>
  );
};

export default PaymentMethod;
