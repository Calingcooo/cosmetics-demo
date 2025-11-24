import { api } from "../axios/instance";

export const contentService = {
    // Get all banners
    getBanners: (endpoint: string) => api.get(endpoint),

    // Get products
    getProducts: (endpoint: string, page: number, category: string) =>
        api.get(endpoint, { params: { page, category } }),

    // Get categories
    getCategories: (endpoint: string) => api.get(endpoint),
}