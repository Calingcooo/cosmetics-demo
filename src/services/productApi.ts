import { publicAxios } from "@/guard/axios-interceptor";

const BASE_URL = "/product";

export const getAllProducts = async () => {
    const res = await publicAxios.get(`${BASE_URL}/all`);
    
    return res.data;
};