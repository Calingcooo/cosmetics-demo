import { api } from "../axios/instance";

export const productService = {
    getProducts: (endpoint: string, page: number, category: string) => api.get(endpoint, {
        params: { page, category }
    }),
    getProduct: (endpoint: string, slug: string | null) => api.get(endpoint, {
        params: { slug }
    }),
    getCategories: (endpoint: string) => api.get(endpoint),
    getFeatured: (endpoint: string) => api.get(endpoint)
};