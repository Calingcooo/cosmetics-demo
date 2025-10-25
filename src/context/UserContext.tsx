"use client";

import { createContext, useState } from "react";
import type { User } from "@/app/types";
import { userService } from "@/lib/api/userService";
import { useToast } from "@/app/hooks/useToast";

type UserContextType = {
  user: User | null;
  getMe: () => Promise<void>;
  updateMe: (updatedData: Partial<User>) => Promise<void>;
};

// CONTEXT
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [initialUser, setInitialUser] = useState<User | null>(null);
  const { addToast } = useToast()

  const getMe = async () => {
    try {
      const { data } = await userService.getUser("/api/user/me");

      setUser(data.user);
      setInitialUser(data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const updateMe = async (updatedData: Partial<User>) => {
    if (!user || !initialUser) return;

    // Check for changes
    const hasChanges = Object.keys(updatedData).some((key) => {
      const k = key as keyof User;
      return updatedData[k] !== initialUser[k];
    });

    if (!hasChanges) {
      console.log("No changes detected — skipping update.");
      return;
    }

    try {
      const { data } = await userService.updateUser(
        "/api/user/update",
        updatedData
      );

      setUser(data.user);
      setInitialUser(data.user);

      addToast({
        title: "Success",
        description: "Account successfully updated!",
      });
    } catch (error) {
      console.error("Failed to update user: ", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, getMe, updateMe }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
