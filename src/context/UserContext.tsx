import { createContext, useState } from "react";
import type { User } from "@/app/types";

type UserContextType = {
  user: User | null;
};

// CONTEXT
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const getUserDetail = async () => {
    
  }

  return (
    <UserContext.Provider value={{ user }}>
        {children}
    </UserContext.Provider>
  );
};

export default UserProvider;