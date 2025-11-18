import { useNavigate } from "react-router-dom";
import { sanitizeInvoiceID } from "../../utils";

export default function RecentInvoicesTable({ invoices = [] }) {
    const navigate = useNavigate();

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("fa-IR", {
            style: "currency",
            currency: "IRR",
            maximumFractionDigits: 0,
        })
            .format(amount)
            .replace("ریال", "تومان");
    };

    const formatDate = (dateString) => {
        if (!dateString) return "نامشخص";
        return new Date(dateString).toLocaleDateString("fa-IR");
    };

    const getStatusColor = (status) => {
        const statusMap = {
            "پرداخت شده": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
            "ارسال شده": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
            "پیش‌نویس": "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
            "لغو شده": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        };
        return statusMap[status] || "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    };

    if (invoices.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                فاکتور اخیری وجود ندارد
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                            شماره فاکتور
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                            مشتری
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                            تاریخ
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                            مبلغ
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                            وضعیت
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {invoices.map((invoice) => (
                        <tr
                            key={invoice.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                            onClick={() => navigate(`/preview/${invoice.id}`)}
                        >
                            <td className="px-4 py-3 text-sm">
                                <span className="font-mono text-gray-900 dark:text-gray-100">
                                    {sanitizeInvoiceID(invoice.id)}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                {invoice.customer?.name || "بدون مشتری"}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                {formatDate(invoice.issueDate)}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                                {formatCurrency(invoice.total)}
                            </td>
                            <td className="px-4 py-3 text-sm">
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                                    {invoice.status || "نامشخص"}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

