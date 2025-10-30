import { api } from "../axios/instance";
import type { ApiResponse } from "@/app/types";

export interface OrderPaymentRequest {
    amount: number;
    email: string;
    purpose: string;
    items: any[];
    user_id: string;
    shipping_address?: any;
    billing_address?: any;
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