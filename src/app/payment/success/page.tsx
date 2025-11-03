import React, { Suspense } from "react";
import PaymentSuccess from "./PaymentSuccess";
import { PaymentSuccessSkeleton } from "@/components/ui/loading/PaymentSuccessSkeleton";

const page = () => {
  return (
    <Suspense fallback={<PaymentSuccessSkeleton />}>
      <PaymentSuccess />
    </Suspense>
  );
};

export default page;