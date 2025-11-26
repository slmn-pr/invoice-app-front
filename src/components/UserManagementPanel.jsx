import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PageLayuot from "../layout/PageLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import UsersTable from "../containers/Admin/UsersTable";
import CustomersTable from "../containers/Customers/CustomerTable";
import InvoicesTable from "../containers/Invoice/Table";
import useFetchUsers from "../hooks/users/useFetchUsers";
import useFetchOwnerCustomers from "../hooks/admin/useFetchOwnerCustomers";
import useFetchOwnerInvoices from "../hooks/admin/useFetchOwnerInvoices";
import { useAuthStore } from "../store/authStore";

const MANAGEMENT_OPTIONS = [
  {
    id: "users",
    title: "مدیریت کاربران",
    description:
      "فهرست تمام کاربران تحت نظارت شما را ببینید و برای هر نفر مشتریان و فاکتورهایش را بررسی کنید.",
    buttonLabel: "مشاهده کاربران",
    onClick: (setFilter) => setFilter("users"),
    type: "filter",
    filterKey: "users",
    roles: ["ADMIN", "SUPER_ADMIN"],
  },
  {
    id: "admins",
    title: "مدیریت ادمین‌ها",
    description:
      "سوپر ادمین‌ها می‌توانند لیست ادمین‌های فعال را بررسی کرده و رفتار آن‌ها را کنترل کنند.",
    buttonLabel: "لیست ادمین‌ها",
    onClick: (setFilter) => setFilter("admins"),
    type: "filter",
    filterKey: "admins",
    roles: ["SUPER_ADMIN"],
  },
  {
    id: "customers",
    title: "مشتریان کاربران",
    description:
      "پس از انتخاب یک کاربر از لیست، مشتریان اختصاصی او سریع نمایش داده می‌شوند؛ برای بررسی، ویرایش یا حذف آن‌ها به بخش مشتریان بروید.",
    buttonLabel: "رفتن به مشتریان",
    onClick: (_, scroll) => scroll("customers"),
    type: "section",
    roles: ["ADMIN", "SUPER_ADMIN"],
  },
  {
    id: "invoices",
    title: "فاکتورهای کاربران",
    description:
      "فاکتورهای هر کاربر را بررسی کنید، از وضعیت‌ها مطلع شوید و در صورت نیاز اقدامات بعدی را برنامه‌ریزی کنید.",
    buttonLabel: "رفتن به فاکتورها",
    onClick: (_, scroll) => scroll("invoices"),
    type: "section",
    roles: ["ADMIN", "SUPER_ADMIN"],
  },
];

export default function UserManagementPanel({
  pageTitle,
  description,
  defaultFilter = "users",
  managementCardIds = ["users", "customers", "invoices"],
}) {
  const user = useAuthStore((s) => s.user);
  const role = user?.role;
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";

  const [activeFilter, setActiveFilter] = useState(defaultFilter);
  const [selectedUser, setSelectedUser] = useState(null);
  const customersSectionRef = useRef(null);
  const invoicesSectionRef = useRef(null);

  useEffect(() => {
    setActiveFilter(defaultFilter);
    setSelectedUser(null);
  }, [defaultFilter]);

  const scrollToSection = useCallback((section) => {
    const ref = section === "customers" ? customersSectionRef : invoicesSectionRef;
    ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const filteredManagementOptions = useMemo(
    () =>
      MANAGEMENT_OPTIONS.filter(
        (option) =>
          managementCardIds.includes(option.id) && option.roles.includes(role)
      ),
    [managementCardIds, role]
  );

  const queryParams = useMemo(() => {
    const base = { page: 1, limit: 12 };
    if (activeFilter === "admins") {
      return { ...base, role: "ADMIN" };
    }
    return { ...base, role: "USER" };
  }, [activeFilter]);

  const { data, isLoading } = useFetchUsers(queryParams);
  const users = data?.users || [];

  const { data: customerData, isLoading: customerLoading } =
    useFetchOwnerCustomers(selectedUser?.id, { limit: 6 });
  const { data: invoiceData, isLoading: invoiceLoading } =
    useFetchOwnerInvoices(selectedUser?.id, { limit: 6 });

  const handleViewCustomers = (record) => {
    setSelectedUser(record);
  };

  const handleViewInvoices = (record) => {
    setSelectedUser(record);
  };

  const customerStats = [
    {
      label: "مشتریان کل",
      value: customerData?.meta?.total ?? 0,
    },
    {
      label: "صفحه فعلی",
      value: customerData?.meta?.page ?? 1,
    },
    {
      label: "محدودیت هر صفحه",
      value: customerData?.meta?.limit ?? 0,
    },
  ];

  const invoiceStatusCounts = (invoiceData?.items || []).reduce(
    (acc, invoice) => {
      const key = invoice.status || "نامشخص";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {}
  );

  const invoicesStats = [
    {
      label: "فاکتورهای کل",
      value: invoiceData?.meta?.total ?? 0,
    },
    {
      label: "صفحه فعلی",
      value: invoiceData?.meta?.page ?? 1,
    },
    {
      label: "پرداخت شده",
      value: invoiceStatusCounts["پرداخت شده"] ?? 0,
    },
    {
      label: "پیش‌نویس",
      value: invoiceStatusCounts["پیش نویس"] ?? 0,
    },
  ];

  const handleCardClick = (option) => {
    if (option.type === "filter") {
      setActiveFilter(option.filterKey);
      setSelectedUser(null);
    }
    if (option.type === "section") {
      scrollToSection(option.id);
    }
  };

  if (!isAdmin) {
    return (
      <PageLayuot pageTitle={pageTitle}>
        <div className="min-h-[360px] flex items-center justify-center text-sm text-red-600 dark:text-red-400">
          برای دسترسی به این بخش باید نقش مدیریتی داشته باشید.
        </div>
      </PageLayuot>
    );
  }

  return (
    <PageLayuot pageTitle={pageTitle} description={description}>
      <div className="space-y-6">
        {filteredManagementOptions.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {filteredManagementOptions.map((option) => {
              const isFilterOption = option.type === "filter";
              const isActiveFilter =
                isFilterOption && activeFilter === option.filterKey;

              return (
                <div
                  key={option.id}
                  className={`rounded-2xl p-4 border shadow-sm bg-white dark:bg-gray-900 transition-colors ${
                    isActiveFilter
                      ? "border-teal-500/60 ring-1 ring-teal-500/40"
                      : "border-gray-200 dark:border-gray-800"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {option.title}
                    </h3>
                    {isFilterOption && (
                      <span
                        className={`text-[0.65rem] font-semibold uppercase px-2 py-1 rounded-full ${
                          isActiveFilter
                            ? "bg-teal-50 text-teal-600"
                            : "bg-gray-100 text-gray-500 dark:bg-gray-800/60 dark:text-gray-300"
                        }`}
                      >
                        {option.filterKey === "admins" ? "ادمین" : "کاربر"}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 min-h-[50px]">
                    {option.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCardClick(option)}
                    className="mt-3 w-full rounded-xl px-3 py-2 text-xs font-medium text-teal-600 dark:text-teal-300 bg-teal-50/80 hover:bg-teal-100 dark:bg-teal-900/50 transition-colors"
                  >
                    {option.buttonLabel}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                فهرست کاربران
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {description ||
                  "به کمک این صفحه می‌توانید کاربرانی که تحت نظارت شما هستند را مشاهده کرده و مشتریان و فاکتورهای آن‌ها را دنبال کنید."}
              </p>
            </div>
          </div>
          {isLoading ? (
            <div className="min-h-[240px] flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <UsersTable
              records={users}
              selectedUserId={selectedUser?.id}
              onViewCustomers={handleViewCustomers}
              onViewInvoices={handleViewInvoices}
            />
          )}
        </div>

        <div className="space-y-6">
          {selectedUser ? (
            <>
              <div
                ref={customersSectionRef}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      مشتریان متعلق به
                    </p>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {selectedUser?.email}
                    </h3>
                  </div>
                  <span className="text-xs rounded-full px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">
                    {selectedUser?.role || "کاربر"}
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {customerStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 p-3 text-center"
                    >
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {stat.label}
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
                {customerLoading ? (
                  <div className="flex items-center justify-center min-h-[200px]">
                    <LoadingSpinner
                      size={32}
                      message="در حال بارگذاری مشتریان ..."
                    />
                  </div>
                ) : (
                  <CustomersTable
                    records={customerData?.items || []}
                    meta={customerData?.meta}
                  />
                )}
              </div>

              <div
                ref={invoicesSectionRef}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      فاکتورهای کاربر
                    </p>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {selectedUser?.email}
                    </h3>
                  </div>
                  <span className="text-xs rounded-full px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
                    {selectedUser?.status || "فعال"}
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {invoicesStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/60 p-3 text-center"
                    >
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {stat.label}
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
                {invoiceLoading ? (
                  <div className="flex items-center justify-center min-h-[200px]">
                    <LoadingSpinner
                      size={32}
                      message="در حال بارگذاری فاکتورها ..."
                    />
                  </div>
                ) : (
                  <InvoicesTable
                    records={invoiceData?.items || []}
                    meta={invoiceData?.meta}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
              ابتدا یک کاربر را از لیست بالا انتخاب کنید تا مشتریان و فاکتورهایش نمایش داده شوند.
            </div>
          )}
        </div>
      </div>
    </PageLayuot>
  );
}

