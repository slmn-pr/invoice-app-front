import { useEffect } from "react";
import { useThemeStore } from "./store/themeStore";

export default function App() {
  // Subscribe to theme changes
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    // Initialize theme on mount - wait for store to hydrate
    const initializeTheme = () => {
      const root = document.documentElement;
      const currentTheme = useThemeStore.getState().theme;
      
      if (currentTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    // Small delay to ensure store is hydrated
    const timer = setTimeout(initializeTheme, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Update theme when it changes
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return null;
}