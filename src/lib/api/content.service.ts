import { api } from "../axios/instance";

export const contentService = {
    // Get all banners
    getBanners: (endpoint: string) => api.get(endpoint)
}