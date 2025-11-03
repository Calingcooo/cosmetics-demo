// checkout/utils/checkoutHelpers.ts
import { User } from "@/app/types";

// Re-export address helpers
export {
    getFormattedAddress,
    isAddressComplete,
    getMissingAddressFields,
    calculateShippingCost,
    calculateTax
} from "@/lib/helpers/address.helper";

// Checkout-specific helpers
export const getMissingPersonalFields = (user: User): string[] => {
    const personalFields = ['first_name', 'last_name', 'email', 'phone'];
    return personalFields.filter(field => !user[field as keyof User] || String(user[field as keyof User]).trim() === '');
};

export const getMissingShippingFields = (user: User): string[] => {
    const shippingFields = ['house_number', 'street_name', 'barangay_label', 'city_label', 'province_label', 'region_label', 'zip_code'];
    return shippingFields.filter(field => !user[field as keyof User] || String(user[field as keyof User]).trim() === '');
};

export const getProfileRedirectTab = (user: User): "personal" | "shipping" => {
    const missingPersonal = getMissingPersonalFields(user);
    const missingShipping = getMissingShippingFields(user);

    // Prioritize shipping address as it's more critical for checkout
    if (missingShipping.length > 0) return "shipping";
    if (missingPersonal.length > 0) return "personal";

    return "shipping"; // Default fallback
};