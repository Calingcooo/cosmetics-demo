import { api } from "../axios/instance";

export const userService = {
    getUser: (endpoint: string) => api.get(endpoint, { withCredentials: true })
};