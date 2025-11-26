import Table from "../../components/Table/Table";
import UsersTableBodyRow from "./UsersTableBodyRow";
import { USERS_TABLE_HEADERS } from "./consts";

export default function UsersTable({
  records = [],
  onViewCustomers = () => {},
  onViewInvoices = () => {},
  selectedUserId,
}) {
  return (
    <Table headers={USERS_TABLE_HEADERS} emptyMessage="هیچ کاربری یافت نشد">
      {records.map((record, index) => (
        <UsersTableBodyRow
          key={record.id || index}
          record={record}
          index={index + 1}
          isSelected={record.id === selectedUserId}
          onViewCustomers={() => onViewCustomers(record)}
          onViewInvoices={() => onViewInvoices(record)}
        />
      ))}
    </Table>
  );
}

