import { Outlet, useNavigate } from "react-router-dom";
import PrimaryButton from "../components/buttons/PrimaryButton";
import SideMenu from "./components/SideMenu";
import { useAuthStore } from "../store/authStore";
import { clearAuthCookies } from "../utils/cookies";
import { useCallback } from "react";
import ThemeToggle from "../components/ThemeToggle";

export default function DashboardLayout() {
    const token = useAuthStore((s) => s.token)
    const logout = useAuthStore((s) => s.logout)
    const user = useAuthStore((s) => s.user)

    const navigate = useNavigate()


    const handleLogout = useCallback(() => {
        console.log("handleLogout click");
        // Clear from global state
        logout()

        // Clear cookie
        clearAuthCookies()

        // navigate to login
        navigate('/login')
    }, [logout, navigate])


    // Check if cookie edited -> logout
    // useEffect(() => {
    //     const unsubscribe = cookies.addChangeListener(() => {
    //         console.log("cookie change detected → logout");
    //         handleLogout();
    //     });

    //     return () => {
    //         cookies.removeChangeListener(unsubscribe)
    //     };
    // }, [handleLogout]);


    return <main className="h-screen w-screen flex bg-white dark:bg-gray-900">


        <aside className="w-60 border-e border-gray-300 dark:border-gray-700 h-full bg-white dark:bg-gray-800">
            <SideMenu />
        </aside>

        <div className="w-[calc(100%-15rem)] h-screen overflow-x-hidden overflow-y-hidden bg-white dark:bg-gray-900">
            {/* App bar */}
            <div className="w-full bg-white dark:bg-gray-800">
                <header className="flex  justify-between items-center border-b border-b-gray-300 dark:border-b-gray-700 p-5 sticky top-0 left-0 bg-white dark:bg-gray-800 z-10">


                    {/* User info */}
                    <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-300">

                        <div className="size-10 rounded-full border border-gray-400 dark:border-gray-600 flex justify-center items-center font-bold text-2xl bg-teal-700 text-white border-none">{String(user.email).at(0)}</div>
                        <span className="font-medium text-lg space-x-1">
                            <span className="font-bold">
                                {user.email}
                            </span>
                            <span>، خوش آمدید</span>

                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        {token && <PrimaryButton PrimaryButton onClick={handleLogout}>
                            خروج
                        </PrimaryButton>}
                    </div>

                </header>
            </div>

            {/* Content */}
            <div className="w-full h-[calc(100%-3rem)] px-5 overflow-y-auto pt-5">
                <Outlet />
            </div>
        </div>




    </main >
}