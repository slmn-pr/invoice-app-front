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
                        className="border border-gray-300 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
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