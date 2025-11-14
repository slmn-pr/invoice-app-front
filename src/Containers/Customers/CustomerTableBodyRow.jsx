import { useMemo } from "react";
import InvoiceTableCell from "./CustomerTableCell";
import { sanitizeCustomerID } from "../../utils";
import { Trash2 } from "lucide-react";

export default function CustomerTableBodyRow({ record = {}, page = 1, index = 1 }) {

    const invoiceIndexNumber = useMemo(() => page * index, [page, index]);
    const customerID = useMemo(() => sanitizeCustomerID(record.id), [record.id])


    return <tr>
        {/* Index */}
        <InvoiceTableCell className="w-20">{invoiceIndexNumber}</InvoiceTableCell>

        {/* Invoice number */}
        <InvoiceTableCell className="w-40">{customerID}</InvoiceTableCell>

        {/* Customer name (full name) */}
        <InvoiceTableCell className="w-60">{record?.name}</InvoiceTableCell>

        {/* Customer email */}
        <InvoiceTableCell className="w-60">{record?.email}</InvoiceTableCell>

        {/* Customer phone */}
        <InvoiceTableCell className="w-60">{record?.phone}</InvoiceTableCell>


        {/* Buttons */}
        <InvoiceTableCell className="w-32">
            <div className="space-x-1">
                <button className="btn-sm btn btn-circle btn-error" >
                    <Trash2 color="#fff" size={18} />
                </button>
            </div>
        </InvoiceTableCell>
    </tr>
}