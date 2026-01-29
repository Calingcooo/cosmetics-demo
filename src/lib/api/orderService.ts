import { api } from "@/lib/axios/instance"
import type { ApiResponse, Order } from "@/app/types";

export const orderService = {
    getOrders: (endpoint: string) => 
      api.get<ApiResponse<{ orders: Order[] }>>(endpoint, { withCredentials: true }),
  
    getOrder: (endpoint: string) => 
      api.get<ApiResponse<{ order: Order }>>(endpoint, { withCredentials: true }),
    
    cancelOrder: (endpoint: string) => 
      api.patch<ApiResponse<{ order: Order }>>(endpoint, { withCredentials: true })
  };