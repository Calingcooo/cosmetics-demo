import { useAppSelector, useAppDispatch } from "../reduxHooks";
import { fetchBanners, fetchProducts, fetchCategories, fetchFeaturedproducts } from "@/redux/thunks/content.thunks";
import { setPage } from "@/redux/slice/content.slice";

export function useContent() {
    const { products, banners, categories, featuredProducts, error, loading, pagination } = useAppSelector(
        (state) => state.content
    );
    const dispatch = useAppDispatch();

    return {
        // State
        products,
        categories,
        banners,
        featuredProducts,
        fetchBannerLoading: loading.fetchingBanners,
        fetchProductsLoading: loading.fetchingProducts,
        fetchCategoriesLoading: loading.fetchingCategories,
        fetchFeaturedLoading: loading.fetchingFeatured,
        fetchBannerError: error.fetchingBanners,
        fetchProductsError: error.fetchingProducts,
        fetchCategoriesError: error.fetchingCategories,
        fetchFeaturedError: error.fetchingFeatured,
        pagination,

        // Async
        fetchBanners: () => dispatch(fetchBanners()),
        fetchProducts: ({ page, category }: { page: number, category: string }) => dispatch(fetchProducts({ page, category })),
        fetchCategories: () => dispatch(fetchCategories()),
        fetchFeaturedproducts: () => dispatch(fetchFeaturedproducts()),

        // Sync
        setPage: (page: number) => setPage(page)
    }
}