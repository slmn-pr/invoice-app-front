import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: "light", // 'light' or 'dark'
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === "light" ? "dark" : "light";
          // Apply theme immediately
          const root = document.documentElement;
          if (newTheme === "dark") {
            root.classList.add("dark");
          } else {
            root.classList.remove("dark");
          }
          return { theme: newTheme };
        }),
      setTheme: (theme) => {
        set({ theme });
        // Apply theme immediately
        const root = document.documentElement;
        if (theme === "dark") {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      },
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

