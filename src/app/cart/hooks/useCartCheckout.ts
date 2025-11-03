// hooks/useCartCheckout.ts
import { useState } from "react";
import { useCart } from "@/lib/hooks/cart/useCart";
import { useAuth } from "@/lib/hooks/auth/useAuth";
import { useUser } from "@/app/hooks/useUser";
import { paymentService } from "@/lib/api/payment.service";
import {
    isAddressComplete,
    createShippingAddress,
    calculateShippingCost,
    calculateTax,
    getMissingAddressFields
} from "@/lib/helpers/address.helper";
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
    const { user } = useUser();

    const processHitPayCheckout = async () => {
        if (items.length === 0) {
            setCheckoutState(prev => ({ ...prev, error: "Cart is empty" }));
            return;
        }

        if (!minimalUser?.id) {
            setCheckoutState(prev => ({ ...prev, error: "User not authenticated" }));
            return;
        }

        // Check if user has complete address
        if (!user || !isAddressComplete(user)) {
            const missingFields = getMissingAddressFields(user);
            setCheckoutState(prev => ({
                ...prev,
                error: `Please complete your shipping address. Missing: ${missingFields.join(', ')}`
            }));
            return;
        }

        setCheckoutState({ loading: true, error: "" });

        try {
            const shippingCost = calculateShippingCost(totalPrice);
            const finalTotal = totalPrice + shippingCost;
            const taxAmount = calculateTax(totalPrice);

            // Create shipping address from user data
            const shipping_address = createShippingAddress(user);

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
                shipping_address,
                billing_address: shipping_address, // Use same as shipping for now
                shipping_cost: shippingCost,
                tax_amount: taxAmount,
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
        hasCompleteAddress: user ? isAddressComplete(user) : false,
        missingAddressFields: user ? getMissingAddressFields(user) : [],
    };
};