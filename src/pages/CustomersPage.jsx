import { Loader, LoaderPinwheel } from "lucide-react";
import AddInvoiceModal from "../containers/Invoice/components/AddInvoiceModal";
import InvoicesTable from "../Containers/Invoice/Table";
import PageLayuot from "../layout/PageLayout";
import useFetchPaginateCustomers from "../hooks/customer/useFetchPaginateCustomers";
import CustomersTable from "../containers/Customers/CustomerTable";

export default function CustomersPage() {


    const { data, isLoading } = useFetchPaginateCustomers()



    const onAddInvoice = () => {
        // add_invoice_modal
        document.getElementById('add_invoice_modal').showModal()
    }

    return <PageLayuot
        pageTitle="مدیریت مشتریان"
        buttonSlot={<button onClick={onAddInvoice} className="bg-white text-gray-900 p-3 rounded cursor-pointer">
            افرودن مشتری جدید
        </button>} >

        {isLoading && <div className="w-full flex flex-col justify-center items-center mt-20">
            <Loader size={100} className="animate-spin" />

            <span className="text-3xl font-semibold text-gray-500">در حال بارگیری داده ها</span></div>}


        {!isLoading && <>
            {/* Table */}
            <CustomersTable records={data?.items} meta={data?.meta} />

            {/* Modal */}
            {/* <AddInvoiceModal /> */}
        </>
        }



    </PageLayuot>
}