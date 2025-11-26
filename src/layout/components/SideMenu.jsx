import { useMemo } from "react"
import { House, ScrollText, UsersRound, Receipt, ShieldCheck, UserCog } from "lucide-react"
import SideMenuItem from "./SideMenuItem"
import { useLocation } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"

const BASE_ITEMS = [
    { name: 'dashboard', label: "داشبورد", icon: House, url: "/" },
    { name: "invoices", label: "فاکتورها", icon: ScrollText, url: "/invoices" },
    { name: "customers", label: "مشتریان", icon: UsersRound, url: "/customers" },
]

const ADMIN_ITEMS = [
    {
        name: "manage-users",
        label: "مدیریت کاربران",
        icon: ShieldCheck,
        url: "/users",
    },
]

const SUPER_ADMIN_ITEMS = [
    {
        name: "manage-admins",
        label: "مدیریت ادمین‌ها",
        icon: UserCog,
        url: "/users/admins",
    },
]

export default function SideMenu() {
    const location = useLocation()
    const role = useAuthStore((s) => s.user?.role)
    const hasAdminAccess = role === "ADMIN" || role === "SUPER_ADMIN"
    const isSuperAdmin = role === "SUPER_ADMIN"

    const items = useMemo(() => {
        const menu = [...BASE_ITEMS]
        if (hasAdminAccess) {
            menu.push(...ADMIN_ITEMS)
        }
        if (isSuperAdmin) {
            menu.push(...SUPER_ADMIN_ITEMS)
        }
        return menu
    }, [hasAdminAccess, isSuperAdmin])

    return (
        <div className="flex flex-col h-full">
            {/* Logo/Brand */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg">
                        <Receipt className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">فاکتورپلاس</h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400">سیستم مدیریت فاکتور</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-1">
                    {items.map((item) => (
                        <SideMenuItem 
                            key={item.name} 
                            item={item} 
                            isActive={location.pathname === item.url} 
                        />
                    ))}
                </ul>
            </nav>
        </div>
    )
}