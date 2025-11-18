import PageLayuot from "../layout/PageLayout";
import useFetchPaginateCustomers from "../hooks/customer/useFetchPaginateCustomers";
import CustomersTable from "../containers/Customers/CustomerTable";
import AddCustomerModal from "../containers/Customers/Modal/AddCustomerModal";
import LoadingSpinner from "../components/LoadingSpinner";

export default function CustomersPage() {
    const { data, isLoading } = useFetchPaginateCustomers()

    return (
        <PageLayuot
            pageTitle="مشتریان"
            buttonSlot={
                <AddCustomerModal buttonContent="افزودن مشتری" />
            }
        >
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <CustomersTable records={data?.items} meta={data?.meta} />
            )}
        </PageLayuot>
    )
}