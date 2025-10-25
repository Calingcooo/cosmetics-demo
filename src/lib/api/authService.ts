import { api } from "../axios/instance";
import type { ApiResponse } from "@/app/types";
import type { User } from "@/app/types";

export const authService = {
    // Login
    login: (
        endpoint: string,
        data: { email: string; password: string }
    ) => api.post<ApiResponse<{ user: User; token: string }>>(endpoint, data),

    // Register
    register: (
        endpoint: string,
        data: {
            first_name: string;
            last_name: string;
            email: string;
            password: string;
        }
    ) => api.post<ApiResponse<{ user: User; token: string }>>(endpoint, data),

    // Get authenticated user
    me: (endpoint: string) => api.get<ApiResponse<{ user: User }>>(endpoint),
};
