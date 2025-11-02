import { Outlet, useNavigate } from "react-router-dom";
import PrimaryButton from "../components/buttons/PrimaryButton";
import SideMenu from "./components/SideMenu";
import { useAuthStore } from "../store/authStore";
import { clearAuthCookies } from "../utils/cookies";

export default function DashboardLayout() {
    const token = useAuthStore((s) => s.token)
    const logout = useAuthStore((s) => s.logout)

    const navigate = useNavigate()


    const handleLogout = () => {
        console.log("handleLogout click");


        // Clear from global state
        logout()

        // Clear cookie
        clearAuthCookies()

        // navigate to login
        navigate('/login')

    }

    let userFullname = "سلمان سلیمان پور"


    return <main className="h-screen w-screen flex">


        <aside className="w-60 border-e border-gray-300 h-full">
            <SideMenu />
        </aside>

        <div className="w-[calc(100%-15rem)] h-screen overflow-x-hidden overflow-y-hidden">
            {/* App bar */}
            <div className="w-full  ">
                <header className="flex  justify-between items-center border-b border-b-gray-300 p-5 sticky top-0 left-0">


                    {/* User info */}
                    <div className="flex items-center space-x-1 text-gray-500">

                        <div className="size-10 rounded-full border border-gray-400 flex justify-center items-center font-bold">S</div>
                        <span className="font-medium text-lg  ">
                            {userFullname}، خوش  آمدید

                        </span>
                    </div>

                    {/* Login or signup button */}
                    {token && <PrimaryButton PrimaryButton onClick={handleLogout}>
                        خروج
                    </PrimaryButton>}

                </header>
            </div>

            {/* Content */}
            <div className="w-full h-[calc(100%-3rem)] px-5 overflow-y-auto pt-5">
                <Outlet />
            </div>
        </div>




    </main >
}