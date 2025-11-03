// orders/page.tsx
import React from "react";
import OrdersLayout from "./components/OrdersLayout";
import OrdersContent from "./components/OrdersContent";

export default function OrdersPage() {
  return (
    <OrdersLayout>
      <OrdersContent />
    </OrdersLayout>
  );
}