import { api } from "../axios/instance";
import type { ApiResponse } from "@/app/types";

export interface Address {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    house_number: string;
    street_name: string;
    barangay: string;
    city: string;
    province: string;
    region: string;
    zip_code: string;
    landmark: string;
}

export interface OrderPaymentRequest {
    amount: number;
    email: string;
    purpose: string;
    user_id: string;
    items: {
        product_id: string;
        product_name: string;
        product_image: string;
        price: number;
        quantity: number;
        selected_variations?: Record<string, string>;
    }[];
    shipping_address?: Address;
    billing_address?: Address;
    shipping_cost?: number;
    tax_amount?: number;
}

export interface OrderPaymentResponse {
    payment_url: string;
    payment_id: string;
    order_id: string;
    status: string;
}

export const paymentService = {
    // Create order with payment (combined endpoint)
    createOrderWithPayment: (endpoint: string, data: OrderPaymentRequest) =>
        api.post<ApiResponse<OrderPaymentResponse>>(endpoint, data, {
            withCredentials: true,
        }),
};