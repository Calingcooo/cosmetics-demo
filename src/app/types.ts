export type ApiErrorResponse  = {
    message?: string;
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

export type Category = {
    id: string;
    name: string;
    slug: string;
}

export type Product = {
    id: number;
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
    phone?: string ;
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