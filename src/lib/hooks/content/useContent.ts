import { useAppSelector, useAppDispatch } from "../reduxHooks";
import { fetchBanners, fetchProducts, fetchCategories } from "@/redux/thunks/content.thunks";
import { setPage } from "@/redux/slice/content.slice";

export function useContent() {
    const { products, banners, categories, error, loading, pagination } = useAppSelector(
        (state) => state.content
    );
    const dispatch = useAppDispatch();

    return {
        // State
        products,
        categories,
        banners,
        fetchBannerLoading: loading.fetchingBanners,
        fetchProductsLoading: loading.fetchingProducts,
        fetchCategoriesLoading: loading.fetchingCategories,
        fetchBannerError: error.fetchingBanners,
        fetchProductsError: error.fetchingProducts,
        fetchCategoriesError: error.fetchingCategories,
        pagination,

        // Async
        fetchBanners: () => dispatch(fetchBanners()),
        fetchProducts: ({ page, category }: { page: number, category: string }) => dispatch(fetchProducts({ page, category })),
        fetchCategories: () => dispatch(fetchCategories()),

        // Sync
        setPage: (page: number) => setPage(page)
    }
}