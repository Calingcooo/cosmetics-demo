import { api } from "../axios/instance";
import type { User } from "@/app/types";

export const userService = {
  // Get the current user
  getUser: (endpoint: string) =>
    api.get<{ user: User }>(endpoint, { withCredentials: true }),

  // Update user data
  updateUser: (endpoint: string, updatedData: Partial<User>) =>
    api.post<{ user: User }>(endpoint, updatedData, { withCredentials: true }),
};
