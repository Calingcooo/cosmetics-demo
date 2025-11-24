import { createAsyncThunk } from "@reduxjs/toolkit";
import { contentService } from "../../lib/api/content.service"

// Fetch banners
export const fetchBanners = createAsyncThunk(
    "contents/fetchBanners",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await contentService.getBanners("/api/content/banners")

            return data.data
        } catch (error) {
            console.error(error)
            return rejectWithValue(error)
        }
    }
)

// Fetch products
export const fetchProducts = createAsyncThunk(
    "contents/fetchProducts",
    async ({ page, category }: { page: number, category: string; }, { rejectWithValue }) => {
        try {
            const { data } = await contentService.getProducts("/api/product/products", page, category)

            return data.data
        } catch (error) {
            console.error(error)
            return rejectWithValue(error)
        }
    }
)

// Fetch categories
export const fetchCategories = createAsyncThunk(
    "contents/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await contentService.getCategories("/api/product/categories")
            
            return data.data.categories
        } catch (error) {
            console.error(error)
            return rejectWithValue(error)
        }
    }
)