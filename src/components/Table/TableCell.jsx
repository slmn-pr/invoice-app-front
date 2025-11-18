export default function TableCell({ children, className = "" }) {
    return (
        <td className={`${className} px-4 py-3 text-sm text-gray-900 dark:text-gray-100`}>
            <div className="flex justify-center items-center w-full">
                {children}
            </div>
        </td>
    )
}

