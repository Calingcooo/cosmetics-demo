import { publicAxios } from "@/guard/axios-interceptor";

const BASE_URL = "/cart";

export const getMyCart = async (id: string) => {
    const res = await publicAxios.get(`${BASE_URL}/${id}`);

    return res.data;
};

export const addToCart = async (product_id: string, quantity: number) => {
    const res = await publicAxios.post(`${BASE_URL}/add`, {
        product_id,
        quantity,
    });
    return res.data;
};
