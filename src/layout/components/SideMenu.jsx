import { House, ScrollText, UsersRound, Receipt } from "lucide-react"
import SideMenuItem from "./SideMenuItem"
import { useLocation } from "react-router-dom"

const items = [
    { name: 'dashboard', label: "داشبورد", icon: House, url: "/" },
    { name: "invoices", label: "فاکتورها", icon: ScrollText, url: "/invoices" },
    { name: "customers", label: "مشتریان", icon: UsersRound, url: "/customers" },
]

export default function SideMenu() {
    const location = useLocation()

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