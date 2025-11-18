import { House, ScrollText, UsersRound } from "lucide-react"
import SideMenuItem from "./SideMenuItem"
import { useLocation } from "react-router-dom"

const items = [
    { name: 'dashboard', label: "خانه", icon: <House />, url: "/" },
    { name: "customers", label: "مشتریان", icon: <UsersRound />, url: "/customers" },
    { name: "invoices", label: "فاکتور ها", icon: <ScrollText />, url: "/invoices" },
]

export default function SideMenu() {

    const location = useLocation()


    return <div className="p-5">

        <div className="text-2xl text-teal-500 dark:text-teal-400 font-bold">به پنل من خوش آمدید</div>
        <ul className="mt-20">
            {items.map((item) => (<SideMenuItem key={item.name} item={item} isActive={location.pathname === item.url} />))}
        </ul>

    </div>
}