import { User } from "@/app/types";

/**
 * Check if user has complete address for checkout
 */
export const isAddressComplete = (user: User | null): boolean => {
    if (!user) return false;

    const requiredFields = [
        user.first_name,
        user.last_name,
        user.email,
        user.house_number,
        user.street_name,
        user.barangay_label,
        user.city_label,
        user.province_label,
        user.region_label,
        user.zip_code
    ];

    return requiredFields.every(field => field && field.trim() !== '');
};

/**
 * Format user address for display
 */
export const getFormattedAddress = (user: User | null): string => {
    if (!user) return "";

    const addressParts = [
        user.house_number,
        user.street_name,
        user.barangay_label,
        user.city_label,
        user.province_label,
        user.region_label,
        user.zip_code
    ].filter(part => part && part.trim() !== '');

    return addressParts.join(', ');
};

/**
 * Convert user data to shipping address format
 */
export const createShippingAddress = (user: User) => {
    return {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone || "",
        house_number: user.house_number || "",
        street_name: user.street_name || "",
        barangay: user.barangay_label || "",
        city: user.city_label || "",
        province: user.province_label || "",
        region: user.region_label || "",
        zip_code: user.zip_code || "",
        landmark: user.landmark || ""
    };
};

/**
 * Validate Philippine phone number format
 */
export const isValidPhilippinePhone = (phone: string | null): boolean => {
    if (!phone) return false;

    const cleanedPhone = phone.replace(/\s/g, '');
    const phoneRegex = /^(09|\+639)\d{9}$/;
    return phoneRegex.test(cleanedPhone);
};

/**
 * Get missing address fields
 */
export const getMissingAddressFields = (user: User | null): string[] => {
    if (!user) return ['user_not_found'];

    const requiredFields = [
        { key: 'first_name', value: user.first_name },
        { key: 'last_name', value: user.last_name },
        { key: 'email', value: user.email },
        { key: 'house_number', value: user.house_number },
        { key: 'street_name', value: user.street_name },
        { key: 'barangay_label', value: user.barangay_label },
        { key: 'city_label', value: user.city_label },
        { key: 'province_label', value: user.province_label },
        { key: 'region_label', value: user.region_label },
        { key: 'zip_code', value: user.zip_code }
    ];

    return requiredFields
        .filter(field => !field.value || field.value.trim() === '')
        .map(field => field.key);
};

/**
 * Calculate shipping cost based on total price
 */
export const calculateShippingCost = (totalPrice: number): number => {
    return totalPrice >= 50 ? 0 : 5.99;
};

/**
 * Calculate tax amount
 */
export const calculateTax = (subtotal: number, taxRate: number = 0.12): number => {
    return Math.round(subtotal * taxRate * 100) / 100;
};