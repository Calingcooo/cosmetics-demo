import { useEffect, useState } from "react";
import { useCart } from "@/lib/hooks/cart/useCart";
import { calculateShippingCost, calculateTax } from "../utils/checkout.helper";

interface OrderSummary {
  subtotal: number;
  // shipping: number;
  // tax: number;
  total: number;
}

export const useOrderSummary = () => {
  const { items, totalPrice } = useCart();
  const [orderSummary, setOrderSummary] = useState<OrderSummary>({
    subtotal: 0,
    // shipping: 0,
    // tax: 0,
    total: 0,
  });

  useEffect(() => {
    if (items.length > 0) {
      const shippingCost = calculateShippingCost(totalPrice);
      const taxAmount = calculateTax(totalPrice);
      const finalTotal = totalPrice + shippingCost + taxAmount;

      setOrderSummary({
        subtotal: totalPrice,
        // shipping: shippingCost,
        // tax: taxAmount,
        total: finalTotal,
      });
    }
  }, [items, totalPrice]);

  return orderSummary;
};