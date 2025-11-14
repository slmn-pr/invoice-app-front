import { CUSTOMERS_TABLE_HEADERS } from "./consts"
import CustomerTableBodyRow from "./CustomerTableBodyRow";

export default function InvoicesTable({ records = [], meta = { "total": 0, "page": 1, "limit": 10, "totalPages": 1 } }) {

    return <table className="w-full">
        <thead>
            <tr>
                {CUSTOMERS_TABLE_HEADERS.map((item, index) =>
                (
                    <th
                        key={`${item}-${index}`}
                        className=" border border-gray-300 p-2">
                        {item}
                    </th>
                ))}
            </tr>
        </thead>

        <tbody>

            {
                records.map((record, index) =>
                    <CustomerTableBodyRow record={record} index={index + 1} page={meta.page} />
                )
            }


        </tbody>

    </table>

}