import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Image {
  id: string;
  url: string;
}

interface Profile {
  id: string;
  company_name: string;
  gender: string;
  date_of_birth: string | null;
  position: string | null;
  phone_number: string | null;
  address: string;
  userId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  image: Image;
  profile?: Profile;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => localStorage.removeItem("user-storage"),
    }),
    {
      name: "user-storage",
      // storage: createJSONStorage(() => sessionStorage),
    }
  )
);
