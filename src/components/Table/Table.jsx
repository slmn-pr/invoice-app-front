export default function Table({ headers = [], children, emptyMessage = "هیچ داده‌ای یافت نشد" }) {
    if (!children || (Array.isArray(children) && children.length === 0)) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-sm">{emptyMessage}</p>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                        {headers.map((header, index) => (
                            <th
                                key={`header-${index}`}
                                className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800/50"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {children}
                </tbody>
            </table>
        </div>
    )
}

