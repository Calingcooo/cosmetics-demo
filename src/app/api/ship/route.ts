import { NextResponse } from "next/server";
import axios from "axios";

export async function POST() {
    try {
        const response = await axios({
            method: "POST",
            url: "https://api.aftership.com/tracking/2025-07/trackings",
            headers: {
                "Content-Type": "application/json",
                "as-api-key": process.env.AFTERSHIP_API_KEY!, // ✅ your API key
            },
            data: {
                slug: "jtexpress-ph", // ✅ courier slug for J&T Express Philippines
                tracking_number: "JT123456789PH", // required
                title: "Order #12345",
                customers: [
                    {
                        role: "buyer",
                        name: "Test 123",
                        email: "customer@email.com",
                        phone_number: "+639171234567",
                        language: "en",
                    },
                ],
                tracking_ship_date: new Date().toISOString().split('T')[0],
                order_id: "12345",
                order_number: "ORDER-2025-0001",
                custom_fields: {
                    note: "Fragile - Handle with care",
                },
                destination_country_region: "PHL",
                destination_city: "Quezon City",
                destination_postal_code: "1100",
                destination_raw_location:
                    "123 Main Street, Quezon City, Metro Manila, Philippines",
            },
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error(
            "AfterShip Error:",
            error.response?.data || error.message
        );
        return NextResponse.json(
            { error: error.response?.data || "Failed to create tracking" },
            { status: error.response?.status || 500 }
        );
    }
}
