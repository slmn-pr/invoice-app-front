import { INVOICE_TABLE_HEADERS } from "./consts";
import InvoiceTableBodyRow from "./InvoiceTableBodyRow";
import Table from "../../components/Table/Table";

export default function InvoicesTable({ records = [], meta = { "total": 0, "page": 1, "limit": 10, "totalPages": 1 } }) {
    return (
        <Table 
            headers={INVOICE_TABLE_HEADERS} 
            emptyMessage="هیچ فاکتوری یافت نشد"
        >
            {records.map((record, index) => (
                <InvoiceTableBodyRow 
                    key={record.id || index} 
                    record={record} 
                    index={index + 1} 
                    page={meta.page} 
                />
            ))}
        </Table>
    )
}