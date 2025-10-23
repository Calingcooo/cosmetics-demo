import { publicAxios } from "@/guard/axios-interceptor";

const BASE_URL = "/product";

export const getProductCategories = async () => {
    const res = await publicAxios.get(`/category/all`);

    return res.data;
}

export const getAllProducts = async (page = 1, category = "all") => {
    const res = await publicAxios.get(`${BASE_URL}/all?page=${page}&limit=8&category=${category}`);

    return res.data;
};

export const getFeaturedProducts = async () => {
    const res = await publicAxios.get(`${BASE_URL}/featured`);

    return res.data;
}

export const getSingleProduct = async (id: string | undefined) => {
    const res = await publicAxios.get(`${BASE_URL}/${id}`);

    return res.data;
}