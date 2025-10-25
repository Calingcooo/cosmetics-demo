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
    phone: string | null;
    dob: Date | null;
    house_number: string | null;
    street_name: string | null;
    region_code: string | null;
    region_label: string | null;
    province_code: string | null;
    province_label: string | null;
    city_code: string | null;
    city_label: string | null;
    barangay_code: string | null;
    barangay_label: string | null;
    zip_code: string | null;
    landmark: string | null;
}