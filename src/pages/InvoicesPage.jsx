import { Plus } from "lucide-react";
import AddInvoiceModal from "../containers/Invoice/components/AddInvoiceModal";
import InvoicesTable from "../containers/Invoice/Table";
import useFetchPaginateInvoices from "../hooks/invoice/useFetchPaginateInvoices";
import PageLayuot from "../layout/PageLayout";
import LoadingSpinner from "../components/LoadingSpinner";

export default function InvoicesPage() {
    const { data, isLoading } = useFetchPaginateInvoices()

    const onAddInvoice = () => {
        document.getElementById('add_invoice_modal').showModal()
    }

    return (
        <PageLayuot
            pageTitle="فاکتورها"
            buttonSlot={
                <button 
                    onClick={onAddInvoice}
                    className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium text-sm shadow-sm transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    <span>فاکتور جدید</span>
                </button>
            }
        >
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <InvoicesTable records={data?.items} meta={data?.meta} />
                    <AddInvoiceModal />
                </>
            )}
        </PageLayuot>
    )
}