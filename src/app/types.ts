export type ApiResponse<T> = {
    success: boolean;
    message?: string;
    data: T;
};

export type ApiErrorResponse = {
    success: false;
    message: string;
};

export type FormData = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
}

export type ProductVariationOption = {
    name: string;
    color?: string;
}

export type ProductVariation = {
    name: string;
    options: ProductVariationOption[];
}

export type ProductImage = {
    url: string;
}

export type Cart = {
    id: string;
    guest_id: string | null;
    created_at: string;
    updated_at: string;
    items: CartItem[];
}

export interface CartItem {
    id: string;
    name: string;
    price_at_add: number;
    image: string;
    category?: string;
    quantity: number;
    selected_variations?: Record<string, string>;
    created_at?: string;
    updated_at?: string;
}

export type Category = {
    id: string;
    name: string;
    slug: string;
}

export type Product = {
    id: string;
    name: string;
    slug: string;
    price: number;
    description: string;
    category: Category;
    featured: boolean;
    images: ProductImage[];
    variations?: ProductVariation[];
}

export type User = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    dob?: Date;
    house_number?: string;
    street_name?: string;
    region_code?: string;
    region_label?: string;
    province_code?: string;
    province_label?: string;
    city_code?: string;
    city_label?: string;
    barangay_code?: string;
    barangay_label?: string;
    zip_code?: string;
    landmark?: string;
}

export type MiminalUser = {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    cart_count: number;
};


//****** PAYMENT ******//
export interface HitPayCreatePaymentRequest {
    amount: number;
    email: string;
    purpose: string;
    items: Array<{
        name: string;
        quantity: number;
        price: number;
    }>;
}

export interface HitPayPaymentResponse {
    id: string;
    url: string;
    status: string;
    currency: string;
    amount: number;
    payment_request_id: string;
    created_at: string;
    updated_at: string;
}

export interface HitPayWebhookData {
    id: string;
    payment_request_id: string;
    payment_id: string;
    status: 'completed' | 'failed' | 'pending';
    amount: number;
    currency: string;
    email: string;
    purpose: string;
}

export interface HitPayApiError {
    code: string;
    message: string;
    errors?: Array<{
        field: string;
        message: string;
    }>;
}