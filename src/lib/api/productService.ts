import { api } from "../axios/instance";
import type { ApiResponse } from "@/app/types";
import type { Product, Category } from "@/app/types";

export const productService = {
  // Fetch paginated products
  getProducts: (endpoint: string, page: number, category: string) =>
    api.get<ApiResponse<{ products: Product[]; totalPages: number }>>(endpoint, {
      params: { page, category },
    }),

  // Fetch a single product by slug
  getProduct: (endpoint: string, slug: string | null) =>
    api.get<ApiResponse<{ product: Product }>>(endpoint, {
      params: { slug },
    }),

  // Fetch all categories
  getCategories: (endpoint: string) =>
    api.get<ApiResponse<{ categories: Category[] }>>(endpoint),

  // Fetch featured products
  getFeatured: (endpoint: string) =>
    api.get<ApiResponse<{ products: Product[] }>>(endpoint),
};
