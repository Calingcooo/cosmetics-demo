export interface CartItem {
    id: string;
    name: string;
    price_at_add: number;
    quantity: number;
    image?: string;
    selected_variations?: Record<string, string>;
}

export interface CheckoutData {
    items: CartItem[];
    total: number;
    hitpayId: string;
    paymentRequestId: string;
}

export interface CartSummaryData {
    totalPrice: number;
    shippingCost: number;
    finalTotal: number;
}