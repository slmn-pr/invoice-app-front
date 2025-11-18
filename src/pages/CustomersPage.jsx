import { Loader } from "lucide-react";
import PageLayuot from "../layout/PageLayout";
import useFetchPaginateCustomers from "../hooks/customer/useFetchPaginateCustomers";
import CustomersTable from "../containers/Customers/CustomerTable";
import AddCustomerModal from "../containers/Customers/Modal/AddCustomerModal";

export default function CustomersPage() {
    const { data, isLoading } = useFetchPaginateCustomers()

    return (
        <PageLayuot
            pageTitle="مشتریان"
            buttonSlot={
                <AddCustomerModal buttonContent="افزودن مشتری" />
            }
        >
            {isLoading && (
                <div className="w-full flex flex-col justify-center items-center py-20">
                    <Loader size={48} className="animate-spin text-teal-500 dark:text-teal-400 mb-4" />
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        در حال بارگیری داده‌ها...
                    </span>
                </div>
            )}

            {!isLoading && (
                <CustomersTable records={data?.items} meta={data?.meta} />
            )}
        </PageLayuot>
    )
}