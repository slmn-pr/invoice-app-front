import UserManagementPanel from "../components/UserManagementPanel";

export default function AdminsPage() {
  return (
    <UserManagementPanel
      pageTitle="مدیریت ادمین‌ها"
      description="در این بخش می‌توانید فهرست ادمین‌های فعال را بررسی کرده و عملکرد آن‌ها را رصد کنید."
      defaultFilter="admins"
      managementCardIds={["admins", "customers", "invoices"]}
    />
  );
}

