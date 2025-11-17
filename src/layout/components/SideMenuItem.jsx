import { useId } from "react"
import { Link } from "react-router-dom"

export default function SideMenuItem({ item = {}, isActive = false }) {

    const id = useId()

    const { label, name, url } = item

    return <Link to={url}>
        <li className={`h-10 gap-x-1 py-7 transition-all font-medium px-5 cursor-pointer flex items-center  ${isActive ? 'text-white bg-teal-400 hover:bg-teal-400/70' : 'text-gray-500 hover:bg-teal-300/20'}`} id={`${id}-${name}`}>


            {item.icon && <div>{item.icon}</div>}

            <div>
                {label}

            </div>
        </li>
    </Link>
}