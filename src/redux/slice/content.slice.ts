import { createSlice } from "@reduxjs/toolkit"
import { fetchBanners } from "../thunks/content.thunks"
import type { BannerType } from "@/types/content"


interface contentState {
    banners: BannerType[]
    loading: {
        fetchingBanners: boolean;
    }
    error: {
        fetchingBanners: string | null;
    }
}

const initialState: contentState = {
    banners: [],
    loading: {
        fetchingBanners: false
    },
    error: {
        fetchingBanners: null
    }
}

const contentSlice = createSlice({
    name: "content",
    initialState,
    reducers: {},
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

            })
    }
})

export default contentSlice.reducer;