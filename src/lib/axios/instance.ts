import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
    headers: {
        "Content-Type": "application/json"
    },
})

export const serverApi = axios.create({
    baseURL: process.env.PRIVATE_API,
})