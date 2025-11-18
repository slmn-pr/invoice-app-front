import { Link } from "react-router-dom"

export default function SideMenuItem({ item = {}, isActive = false }) {
    const { label, name, url, icon: Icon } = item

    return (
        <Link to={url} className="block">
            <li
                className={`
                    group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive 
                        ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 shadow-sm' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100'
                    }
                `}
            >
                <Icon 
                    className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-teal-600 dark:text-teal-400' : 'text-gray-500 dark:text-gray-400'
                    }`} 
                />
                <span className="font-medium text-sm">{label}</span>
                {isActive && (
                    <div className="mr-auto w-1 h-1 rounded-full bg-teal-600 dark:bg-teal-400"></div>
                )}
            </li>
        </Link>
    )
}