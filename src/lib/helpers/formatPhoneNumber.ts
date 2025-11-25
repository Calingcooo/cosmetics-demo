export const formatPhoneNumber = (phone: string): string => {
    if (!phone) return '';

    const cleanPhone = phone.replace(/\D/g, '');

    // Handle +63 format (12 digits total)
    if (cleanPhone.startsWith('63') && cleanPhone.length === 12) {
        console.log("12 digits~")
        return `+63 ${cleanPhone.slice(2, 5)} ${cleanPhone.slice(5, 8)} ${cleanPhone.slice(8)}`;
    }

    // Handle 09 format (11 digits total)
    if (cleanPhone.startsWith("09") && cleanPhone.length === 11) {
        return `${cleanPhone.slice(0, 4)} ${cleanPhone.slice(4, 7)} ${cleanPhone.slice(7, 11)}`;
    }

    // Handle 9 format (10 digits - missing leading 0)
    if (cleanPhone.startsWith('9') && cleanPhone.length === 10) {
        console.log("no zero~")
        return `09${cleanPhone.slice(1, 5)} ${cleanPhone.slice(5)}`;
    }

    return phone;
};