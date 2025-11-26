import TableCell from "../../components/Table/TableCell";

const STATUS_STYLES = {
  ACTIVE: "bg-emerald-100/70 text-emerald-700 dark:text-emerald-200",
  BANNED: "bg-red-100/70 text-red-700 dark:text-red-200",
  SUSPENDED: "bg-yellow-100/70 text-yellow-700 dark:text-yellow-200",
  PENDING_VERIFICATION:
    "bg-blue-100/70 text-blue-700 dark:text-blue-200",
  default: "bg-gray-100/70 text-gray-700 dark:text-gray-200",
};

const ROLE_LABELS = {
  USER: "کاربر",
  ADMIN: "ادمین",
  SUPER_ADMIN: "سوپر ادمین",
};

export default function UsersTableBodyRow({
  record = {},
  index = 1,
  isSelected = false,
  onViewCustomers = () => {},
  onViewInvoices = () => {},
}) {
  const statusClass =
    STATUS_STYLES[record?.status] || STATUS_STYLES["default"];
  const roleLabel = ROLE_LABELS[record?.role] || "نامشخص";

  return (
    <tr
      className={`transition-colors ${isSelected ? "bg-teal-50 dark:bg-teal-900/40" : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
        }`}
    >
      <TableCell className="w-20">
        <span className="text-gray-500 dark:text-gray-400 font-medium">
          {index}
        </span>
      </TableCell>
      <TableCell>
        <span className="text-gray-900 dark:text-gray-100 font-medium">
          {record?.email || "بدون ایمیل"}
        </span>
      </TableCell>
      <TableCell>
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {roleLabel}
        </span>
      </TableCell>
      <TableCell>
        <span
          className={`inline-flex items-center justify-center px-2 py-1 text-xs font-semibold rounded-full ${statusClass}`}
        >
          {record?.status || "نامشخص"}
        </span>
      </TableCell>
      <TableCell className="w-48">
        <div className="flex items-center gap-2 justify-center flex-wrap">
          <button
            type="button"
            onClick={onViewCustomers}
            className="px-3 py-1 rounded-lg text-xs font-medium text-teal-600 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-900/40 transition-colors"
          >
            مشتریان
          </button>
          <button
            type="button"
            onClick={onViewInvoices}
            className="px-3 py-1 rounded-lg text-xs font-medium text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/40 transition-colors"
          >
            فاکتورها
          </button>
        </div>
      </TableCell>
    </tr>
  );
}

