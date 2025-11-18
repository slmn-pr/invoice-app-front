import { CUSTOMERS_TABLE_HEADERS } from "./consts"
import CustomerTableBodyRow from "./CustomerTableBodyRow";
import Table from "../../components/Table/Table";

export default function CustomersTable({ records = [], meta = { "total": 0, "page": 1, "limit": 10, "totalPages": 1 } }) {
    return (
        <Table 
            headers={CUSTOMERS_TABLE_HEADERS} 
            emptyMessage="هیچ مشتری‌ای یافت نشد"
        >
            {records.map((record, index) => (
                <CustomerTableBodyRow 
                    key={record.id || index}
                    record={record} 
                    index={index + 1} 
                    page={meta.page} 
                />
            ))}
        </Table>
    )
}