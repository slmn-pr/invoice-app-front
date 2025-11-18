import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getAccessTokenFromCookie, clearAuthCookies } from "../utils/cookies";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      login: (data) => set({ user: data.user, token: data.token }),
      logout: () => {
        clearAuthCookies();
        set({ user: null, token: null });
      },
      register: (data) => set({ user: data.user, token: data.token }),
      // Sync token from cookie on initialization
      syncTokenFromCookie: () => {
        const cookieToken = getAccessTokenFromCookie();
        if (!cookieToken) {
          // If no cookie token, clear store
          set({ user: null, token: null });
        } else {
          // If cookie exists but store doesn't, keep store as is (don't overwrite)
          // This is mainly for checking if token exists
          const currentToken = get().token;
          if (!currentToken) {
            // If store has no token but cookie does, token might be expired
            // Clear cookie and store
            clearAuthCookies();
            set({ user: null, token: null });
          }
        }
      },
      // Check if user is authenticated (has both cookie and store token)
      isAuthenticated: () => {
        const cookieToken = getAccessTokenFromCookie();
        const storeToken = get().token;
        return !!(cookieToken && storeToken);
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
