export default function InvoiceTableCell({ children, className = "" }) {
    return <td className={`${className} border border-gray-300 p-2 `}>
        <div className="flex justify-center text-center w-full">
            {children}
        </div>
    </td>
}