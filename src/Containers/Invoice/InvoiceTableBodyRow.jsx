import { useNavigate } from "react-router-dom"
import { Download, LoaderCircle, Trash2 } from "lucide-react";
import { useMemo } from "react";
import InvoiceTableCell from "./InvoiceTableCell";
import useDeleteInvoice from "../../hooks/invoice/useDeleteInvoice";
import { sanitizeInvoiceID } from "../../utils";

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




    return <tr>

        {/* Index */}
        <InvoiceTableCell className="w-20">{invoiceIndexNumber}</InvoiceTableCell>

        {/* Invoice number */}
        <InvoiceTableCell className="w-40">{invoiceID}</InvoiceTableCell>

        {/* Customer name (full name) */}
        <InvoiceTableCell className="w-60">{record?.customer.name}</InvoiceTableCell>

        <InvoiceTableCell className="w-40">{record?.issueDate}</InvoiceTableCell>
        <InvoiceTableCell className="w-40">{record?.dueDate} </InvoiceTableCell>

        {/* Status */}
        <InvoiceTableCell className="w-32">{record?.status || "نامشخص"}</InvoiceTableCell>

        {/* Download button */}
        <InvoiceTableCell className="w-32">

            <div className="space-x-1">
                <button className="btn-sm btn btn-circle btn-info" onClick={onDownloadClick}>
                    <Download color="#fff" size={18} />
                </button>

                <button className="btn-sm btn btn-circle btn-error" onClick={() => onInvoiceDelete(record.id)}>
                    {isDeleting && <LoaderCircle size={18} color="#fff" className="animate-spin" />}

                    {!isDeleting && <Trash2 color="#fff" size={18} />}
                </button>

            </div>
        </InvoiceTableCell>
    </tr>
}