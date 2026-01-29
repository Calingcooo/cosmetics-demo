import { createSlice } from "@reduxjs/toolkit"
import { fetchBanners, fetchProducts, fetchCategories, fetchFeaturedproducts } from "../thunks/content.thunks"
import type { BannerType } from "@/types/content"
import type { Product, Category } from "@/app/types"


interface contentState {
    banners: BannerType[];
    products: Product[];
    categories: Category[];
    featuredProducts: Product[];
    loading: {
        fetchingBanners: boolean;
        fetchingProducts: boolean
        fetchingCategories: boolean;
        fetchingFeatured: boolean;
    }
    error: {
        fetchingBanners: string | null;
        fetchingProducts: string | null
        fetchingCategories: string | null
        fetchingFeatured: string | null
    }
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

const initialState: contentState = {
    banners: [],
    products: [],
    categories: [],
    featuredProducts: [],
    loading: {
        fetchingBanners: false,
        fetchingProducts: false,
        fetchingCategories: false,
        fetchingFeatured: false
    },
    error: {
        fetchingBanners: null,
        fetchingProducts: null,
        fetchingCategories: null,
        fetchingFeatured: null
    },
    pagination: {
        page: 1,
        limit: 8,
        total: 0,
        totalPages: 0
    }
}

const contentSlice = createSlice({
    name: "content",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.pagination.page = action.payload
        }
    },
    extraReducers: (builder) => {
        // Fetch banners / carousel
        builder
            .addCase(fetchBanners.pending, (state) => {
                state.loading.fetchingBanners = true
                state.error.fetchingBanners = null
            })
            .addCase(fetchBanners.fulfilled, (state, action) => {
                state.loading.fetchingBanners = false
                state.error.fetchingBanners = null
                state.banners = action.payload
            })
            .addCase(fetchBanners.rejected, (state, action) => {
                state.loading.fetchingBanners = false;
                state.error.fetchingBanners = action.payload as string;
            });

        // Fetch products
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading.fetchingProducts = true
                state.error.fetchingProducts = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading.fetchingProducts = false
                state.error.fetchingProducts = null
                state.products = action.payload.products

                state.pagination = {
                    page: action.payload.currentPage,
                    limit: state.pagination.limit,
                    total: action.payload.total,
                    totalPages: action.payload.totalPages
                }
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading.fetchingProducts = false;
                state.error.fetchingProducts = action.payload as string;
            });

        // Fetch categories
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading.fetchingCategories = true
                state.error.fetchingCategories = null
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading.fetchingCategories = false
                state.categories = action.payload
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading.fetchingCategories = false
                state.error.fetchingCategories = action.payload as string
            })

        // Fetch featured products
        builder
            .addCase(fetchFeaturedproducts.pending, (state) => {
                state.loading.fetchingFeatured = true
                state.error.fetchingFeatured = null
            })
            .addCase(fetchFeaturedproducts.fulfilled, (state, action) => {
                state.loading.fetchingFeatured = false
                state.featuredProducts = action.payload
            })
            .addCase(fetchFeaturedproducts.rejected, (state, action) => {
                state.loading.fetchingFeatured = false
                state.error.fetchingFeatured = action.payload as string;
            })
    }
})

export const { setPage } = contentSlice.actions

export default contentSlice.reducer;