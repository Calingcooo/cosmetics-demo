import { api } from "../axios/instance";

export const authService = {
    login: (endpoint: string, data: { email: string, password: string }) => api.post(endpoint, data),
    register: (endpoint: string, data: { first_name: string, last_name: string, email: string, password: string }) => api.post(endpoint, data),
    me: (endpoint: string) => api.get(endpoint)
};