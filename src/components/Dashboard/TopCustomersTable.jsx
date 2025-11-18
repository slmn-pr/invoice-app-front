export default function TopCustomersTable({ customers = [] }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("fa-IR", {
            style: "currency",
            currency: "IRR",
            maximumFractionDigits: 0,
        })
            .format(amount)
            .replace("ریال", "تومان");
    };

    if (customers.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                مشتری برتری وجود ندارد
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                            رتبه
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                            نام مشتری
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                            تعداد فاکتور
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                            مجموع درآمد
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {customers.map((customer, index) => (
                        <tr
                            key={customer.customerId}
                            className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                            <td className="px-4 py-3 text-sm">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 font-bold">
                                    {index + 1}
                                </div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-gray-100">
                                        {customer.customerName}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {customer.customerEmail}
                                    </p>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                {new Intl.NumberFormat("fa-IR").format(customer.invoiceCount)}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                                {formatCurrency(customer.revenue)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

