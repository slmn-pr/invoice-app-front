import { Plus } from "lucide-react";
import PageLayuot from "../layout/PageLayout";
import useFetchPaginateCustomers from "../hooks/customer/useFetchPaginateCustomers";
import CustomersTable from "../containers/Customers/CustomerTable";
import AddCustomerModal from "../containers/Customers/Modal/AddCustomerModal";
import LoadingSpinner from "../components/LoadingSpinner";

export default function CustomersPage() {
    const { data, isLoading } = useFetchPaginateCustomers()

    const onAddCustomer = () => {
        document.getElementById('add_customer_modal').showModal()
    }

    return (
        <PageLayuot
            pageTitle="مشتریان"
            buttonSlot={
                <button 
                    onClick={onAddCustomer}
                    className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium text-sm shadow-sm transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    <span>مشتری جدید</span>
                </button>
            }
        >
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <CustomersTable records={data?.items} meta={data?.meta} />
                    <AddCustomerModal />
                </>
            )}
        </PageLayuot>
    )
}