import UserManagementPanel from "../components/UserManagementPanel";

export default function UsersPage() {
  return (
    <UserManagementPanel
      pageTitle="مدیریت کاربران"
      description="به کمک این صفحه می‌توانید کاربران عادی را رصد کرده و مشتریان و فاکتورهای آن‌ها را بررسی کنید."
      defaultFilter="users"
      managementCardIds={["users", "customers", "invoices"]}
    />
  );
}
