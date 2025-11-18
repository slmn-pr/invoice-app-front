import { useNavigate } from "react-router-dom"
import { Download, LoaderCircle, Trash2 } from "lucide-react";
import { useMemo } from "react";
import TableCell from "../../components/Table/TableCell";
import useDeleteInvoice from "../../hooks/invoice/useDeleteInvoice";
import { sanitizeInvoiceID } from "../../utils";
import EditInvoiceModal from "./components/EditInvoiceModal";

export default function InvoiceTableBodyRow({ record = {}, page = 1, index = 1 }) {
    const naviagtion = useNavigate()

    const { mutate: onInvoiceDelete, isPending: isDeleting } = useDeleteInvoice()



    const invoiceIndexNumber = useMemo(() => page * index, [page, index]);
    const invoiceID = useMemo(() => sanitizeInvoiceID(record.id), [record.id])


    const onDownloadClick = () => {
        naviagtion(`/preview/${record.id}`, {
            replace: false
        })
    }




    const getStatusColor = (status) => {
        const statusMap = {
            "پرداخت شده": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
            "ارسال شده": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
            "پیش‌نویس": "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
            "لغو شده": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        };
        return statusMap[status] || "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    };

    return (
        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            {/* Index */}
            <TableCell className="w-20">
                <span className="text-gray-500 dark:text-gray-400 font-medium">{invoiceIndexNumber}</span>
            </TableCell>

            {/* Invoice number */}
            <TableCell className="w-40">
                <span className="font-mono text-sm font-medium text-gray-900 dark:text-gray-100">{invoiceID}</span>
            </TableCell>

            {/* Owner */}
            <TableCell className="w-60">
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {record?.owner?.email || "نامشخص"}
                </span>
            </TableCell>

            {/* Customer name */}
            <TableCell className="w-60">
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                    {record?.customer?.name || "نامشخص"}
                </span>
            </TableCell>

            {/* Status */}
            <TableCell className="w-32">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(record?.status)}`}>
                    {record?.status || "نامشخص"}
                </span>
            </TableCell>

            {/* Actions */}
            <TableCell className="w-32">
                <div className="flex items-center gap-2 justify-center">
                    <button 
                        onClick={onDownloadClick}
                        className="p-2 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-colors"
                        title="دانلود"
                    >
                        <Download size={18} />
                    </button>

                    <EditInvoiceModal id={record.id} />

                    <button 
                        onClick={() => onInvoiceDelete(record.id)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="حذف"
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <LoaderCircle size={18} className="animate-spin" />
                        ) : (
                            <Trash2 size={18} />
                        )}
                    </button>
                </div>
            </TableCell>
        </tr>
    )
}