import { Loader, LoaderPinwheel } from "lucide-react";
import AddInvoiceModal from "../containers/Invoice/components/AddInvoiceModal";
import InvoicesTable from "../containers/Invoice/Table";
import useFetchPaginateInvoices from "../hooks/invoice/useFetchPaginateInvoices";
import PageLayuot from "../layout/PageLayout";

export default function InvoicesPage() {


    const { data, isLoading } = useFetchPaginateInvoices()



    const onAddInvoice = () => {
        // add_invoice_modal
        document.getElementById('add_invoice_modal').showModal()
    }

    return <PageLayuot
        pageTitle="مدیریت فاکتور ها"
        buttonSlot={<button onClick={onAddInvoice} className="bg-white text-gray-900 p-3 rounded cursor-pointer">صدور فاکتور جدید</button>} >

        {isLoading && <div className="w-full flex flex-col justify-center items-center mt-20">
            <Loader size={100} className="animate-spin" />

            <span className="text-3xl font-semibold text-gray-500">در حال بارگیری داده ها</span></div>}


        {!isLoading && <>
            {/* Table */}
            <InvoicesTable records={data?.items} meta={data?.meta} />

            {/* Modal */}
            <AddInvoiceModal /></>}


    </PageLayuot>
}