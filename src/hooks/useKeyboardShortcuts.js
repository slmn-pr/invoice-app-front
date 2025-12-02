import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useThemeStore } from "../store/themeStore";

/**
 * Custom hook for managing keyboard shortcuts
 */
export default function useKeyboardShortcuts(onHelpOpen) {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const role = user?.role;
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  const handleKeyDown = useCallback(
    (event) => {
      // Ignore shortcuts when user is typing in inputs, textareas, or contenteditable elements
      if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA" ||
        event.target.isContentEditable ||
        (event.target.tagName === "BUTTON" && event.target.closest(".modal"))
      ) {
        return;
      }

      // Check for Ctrl/Cmd + key combinations
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const modifier = isMac ? event.metaKey : event.ctrlKey;

      if (!modifier) return;

      event.preventDefault();

      switch (event.key.toLowerCase()) {
        case "1":
          navigate("/");
          break;
        case "2":
          navigate("/invoices");
          break;
        case "3":
          navigate("/customers");
          break;
        case "4":
          if (role === "ADMIN" || role === "SUPER_ADMIN") {
            navigate("/users");
          }
          break;
        case "5":
          if (role === "SUPER_ADMIN") {
            navigate("/users/admins");
          }
          break;
        case "n":
          // New invoice - trigger the add invoice modal
          if (window.location.pathname === "/invoices") {
            const modal = document.getElementById("add_invoice_modal");
            if (modal) {
              modal.showModal();
            }
          }
          // New customer - trigger the add customer modal
          else if (window.location.pathname === "/customers") {
            const modal = document.getElementById("add_customer_modal");
            if (modal) {
              modal.showModal();
            }
          }
          break;
        case "?":
        case "h":
          // Open help modal
          if (onHelpOpen) {
            onHelpOpen();
          }
          break;
        case "k":
          // Toggle theme
          toggleTheme();
          break;
        default:
          break;
      }
    },
    [navigate, role, onHelpOpen, toggleTheme]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
}

