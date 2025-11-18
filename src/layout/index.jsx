import { Outlet, useNavigate } from "react-router-dom";
import SideMenu from "./components/SideMenu";
import { useAuthStore } from "../store/authStore";
import { clearAuthCookies } from "../utils/cookies";
import { useCallback } from "react";
import ThemeToggle from "../components/ThemeToggle";
import { LogOut } from "lucide-react";

export default function DashboardLayout() {
    const token = useAuthStore((s) => s.token)
    const logout = useAuthStore((s) => s.logout)
    const user = useAuthStore((s) => s.user)

    const navigate = useNavigate()

    const handleLogout = useCallback(() => {
        logout()
        clearAuthCookies()
        navigate('/login')
    }, [logout, navigate])

    return (
        <main className="h-screen w-screen flex bg-gray-50 dark:bg-gray-950 overflow-hidden">
            {/* Modern Sidebar */}
            <aside className="w-72 border-l border-gray-200 dark:border-gray-800 h-full bg-white dark:bg-gray-900 flex flex-col">
                <SideMenu />
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Modern Header */}
                <header className="h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 sticky top-0 z-50">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                            {String(user?.email || 'U').at(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {user?.email || 'کاربر'}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">خوش آمدید</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        {token && (
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>خروج</span>
                            </button>
                        )}
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950">
                    <div className="max-w-7xl mx-auto p-6">
                        <Outlet />
                    </div>
                </div>
            </div>
        </main>
    )
}