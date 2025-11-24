import { useAppSelector, useAppDispatch } from "../reduxHooks";
import { fetchBanners } from "@/redux/thunks/content.thunks";

export function useContent() {
    const { banners, error, loading } = useAppSelector(
        (state) => state.content
    );
    const dispatch = useAppDispatch();

    return {
        // State
        banners,
        fetchBannerError: error.fetchingBanners,
        fetBannerLoading: loading.fetchingBanners,

        // Async
        fetchBanners: () => dispatch(fetchBanners())

        // Sync
    }
}