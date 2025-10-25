"use client";

import { createContext, useState } from "react";
import type { User } from "@/app/types";
import { userService } from "@/lib/api/userService";

type UserContextType = {
  user: User | null;
  getMe: () => Promise<void>;
};

// CONTEXT
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const getMe = async () => {
    try {
      const { data } = await userService.getUser("/api/user/me");

      setUser(data.user)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider value={{ user, getMe }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
