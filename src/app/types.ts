export type AuthResponse = {
    success: boolean;
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

export type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    featured: boolean;
    images: ProductImage[];
    variations?: ProductVariation[];
}