import React from "react";
import TabHeader from "./TabHeader";

const PaymentMethod = () => {
  return (
    <div className="space-y-4 bg-[theme(--card)] p-5">
      <TabHeader
        title="Payment Method"
        subtitle="Update your payment details here."
      />
    </div>
  );
};

export default PaymentMethod;
