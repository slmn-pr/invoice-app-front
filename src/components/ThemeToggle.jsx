import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../store/themeStore";

export default function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <button
      onClick={() => toggleTheme()}
      className="btn btn-circle btn-ghost"
      aria-label="Toggle theme"
      type="button"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}

