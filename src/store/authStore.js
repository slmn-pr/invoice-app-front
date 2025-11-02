import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (data) => set({ user: data.user, token: data.token }),
      logout: () => set({ user: null, token: null }),
      register: (data) => set({ user: data.user, token: data.token }),
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);
