export default function InvoiceTableCell({ children, className = "" }) {
    return <td className={`${className} border border-gray-300 dark:border-gray-700 p-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <div className="flex justify-center text-center w-full">
            {children}
        </div>
    </td>
}