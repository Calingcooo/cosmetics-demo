import { publicAxios } from "@/guard/axios-interceptor";

const BASE_URL = "/product";

export const getAllProducts = async () => {
    const res = await publicAxios.get(`${BASE_URL}/all`);
    
    return res.data;
};

export const getFeaturedProducts = async () => {
    const res = await publicAxios.get(`${BASE_URL}/featured`);

    return res.data;
}