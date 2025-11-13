import { INVOICE_TABLE_HEADERS } from "./consts";
import InvoiceTableBodyRow from "./InvoiceTableBodyRow";

export default function InvoicesTable({ records = [], meta = { "total": 0, "page": 1, "limit": 10, "totalPages": 1 } }) {




    return <table className="w-full">
        <thead>
            <tr>
                {INVOICE_TABLE_HEADERS.map((item, index) => (<th key={`${item}-${index}`} className="w-20 border border-gray-300 p-2">{item}</th>))}
            </tr>
        </thead>

        <tbody>

            {
                records.map((record, index) => <InvoiceTableBodyRow record={record} index={index + 1} page={meta.page} />)
            }


        </tbody>

    </table>

}