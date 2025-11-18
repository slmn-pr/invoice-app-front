import { INVOICE_TABLE_HEADERS } from "./consts";
import InvoiceTableBodyRow from "./InvoiceTableBodyRow";

export default function InvoicesTable({ records = [], meta = { "total": 0, "page": 1, "limit": 10, "totalPages": 1 } }) {
    if (records.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-sm">هیچ فاکتوری یافت نشد</p>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                        {INVOICE_TABLE_HEADERS.map((item, index) => (
                            <th
                                key={`${item}-${index}`}
                                className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800/50"
                            >
                                {item}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {records.map((record, index) => (
                        <InvoiceTableBodyRow 
                            key={record.id || index} 
                            record={record} 
                            index={index + 1} 
                            page={meta.page} 
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}