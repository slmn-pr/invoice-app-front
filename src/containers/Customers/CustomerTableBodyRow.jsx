import { useMemo } from "react";
import TableCell from "../../components/Table/TableCell";
import { sanitizeCustomerID } from "../../utils";
import { LoaderCircle, Trash2 } from "lucide-react";
import useDeleteCustomer from "../../hooks/customer/useDeleteCustomer";
import EditCustomerModal from "./Modal/EditCustomerModal";

export default function CustomerTableBodyRow({ record = {}, page = 1, index = 1 }) {
    const invoiceIndexNumber = useMemo(() => page * index, [page, index]);
    const customerID = useMemo(() => sanitizeCustomerID(record.id), [record.id])
    const { mutate: onDelete, isPending } = useDeleteCustomer()

    return (
        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            {/* Index */}
            <TableCell className="w-20">
                <span className="text-gray-500 dark:text-gray-400 font-medium">{invoiceIndexNumber}</span>
            </TableCell>

            {/* Customer ID */}
            <TableCell className="w-40">
                <span className="font-mono text-sm font-medium text-gray-900 dark:text-gray-100">{customerID}</span>
            </TableCell>

            {/* Customer name */}
            <TableCell className="w-60">
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                    {record?.name || "نامشخص"}
                </span>
            </TableCell>

            {/* Customer email */}
            <TableCell className="w-60">
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {record?.email || "نامشخص"}
                </span>
            </TableCell>

            {/* Customer phone */}
            <TableCell className="w-60">
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {record?.phone || "نامشخص"}
                </span>
            </TableCell>

            {/* Actions */}
            <TableCell className="w-32">
                <div className="flex items-center gap-2 justify-center">
                    <EditCustomerModal id={record.id} />

                    <button 
                        onClick={() => onDelete(record.id)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="حذف"
                        disabled={isPending}
                    >
                        {isPending ? (
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