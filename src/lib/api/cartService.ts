import { api } from "../axios/instance";
import type { ApiResponse } from "@/app/types";
import type { User } from "@/app/types";

export const cartService = {
    // My cart
    me: (endpoint: string) => api.get(endpoint)
};