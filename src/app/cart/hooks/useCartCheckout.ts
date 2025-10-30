// hooks/useCartCheckout.ts
import { useState } from "react";
import { useCart } from "@/lib/hooks/cart/useCart";
import { useAuth } from "@/lib/hooks/auth/useAuth";
import { paymentService } from "@/lib/api/payment.service";
import type { CartItem } from "@/app/types";

interface CheckoutState {
    loading: boolean;
    error: string;
}

export const useCartCheckout = () => {
    const [checkoutState, setCheckoutState] = useState<CheckoutState>({
        loading: false,
        error: "",
    });

    const { items, totalPrice } = useCart();
    const { minimalUser } = useAuth();

    const processHitPayCheckout = async () => {
        if (items.length === 0) {
            setCheckoutState(prev => ({ ...prev, error: "Cart is empty" }));
            return;
        }

        if (!minimalUser?.id) {
            setCheckoutState(prev => ({ ...prev, error: "User not authenticated" }));
            return;
        }

        setCheckoutState({ loading: true, error: "" });

        try {
            const shippingCost = totalPrice >= 50 ? 0 : 5.99;
            const finalTotal = totalPrice + shippingCost;

            console.log("🔄 Creating order with payment for total:", finalTotal);

            const orderPaymentPayload = {
                amount: finalTotal,
                email: minimalUser.email,
                purpose: `Purchase of ${items.length} items`,
                user_id: minimalUser.id,
                items: items.map((item: CartItem) => ({
                    product_id: item.id,
                    product_name: item.name,
                    product_image: item.image,
                    price: item.price_at_add,
                    quantity: item.quantity,
                    selected_variations: item.selected_variations,
                })),
                shipping_cost: shippingCost,
                tax_amount: finalTotal * 0.12, // Example tax calculation
            };

            const response = await paymentService.createOrderWithPayment(
                "/api/payments/create-order-payment",
                orderPaymentPayload
            );

            console.log("✅ Order and payment created:", response.data.data);

            // Store checkout data
            const checkoutData = {
                items,
                total: finalTotal,
                order_id: response.data.data.order_id,
                payment_id: response.data.data.payment_id,
            };

            sessionStorage.setItem("hitpay_checkout_data", JSON.stringify(checkoutData));

            // Redirect to payment
            if (response.data.data.payment_url) {
                window.location.href = response.data.data.payment_url;
            } else {
                throw new Error("No payment URL received from server");
            }

        } catch (error: any) {
            console.error("Order and payment creation error:", error);
            const errorMessage = error.response?.data?.message || error.message || "Failed to create order and payment";
            setCheckoutState(prev => ({ ...prev, error: errorMessage }));
        } finally {
            setCheckoutState(prev => ({ ...prev, loading: false }));
        }
    };

    return {
        ...checkoutState,
        processHitPayCheckout,
    };
};