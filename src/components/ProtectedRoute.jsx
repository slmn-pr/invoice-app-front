import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

export default function ProtectedRoute() {
    const { syncTokenFromCookie, isAuthenticated } = useAuthStore();

    // Sync token from cookie on mount
    useEffect(() => {
        syncTokenFromCookie();
    }, [syncTokenFromCookie]);

    // Check if user is authenticated (has both cookie and store token)
    const hasValidAuth = isAuthenticated();

    if (!hasValidAuth) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
