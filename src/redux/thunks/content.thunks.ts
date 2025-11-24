import { createAsyncThunk } from "@reduxjs/toolkit";
import { contentService } from "../../lib/api/content.service"

export const fetchBanners = createAsyncThunk(
    "contents/fetchBanners",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await contentService.getBanners("/api/content/banners")

            console.log(data)

            return data.data
        } catch (error) {
            console.error(error)
            return rejectWithValue(error)
        }
    }
)