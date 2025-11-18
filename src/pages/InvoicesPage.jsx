import { Loader, Plus } from "lucide-react";
import AddInvoiceModal from "../containers/Invoice/components/AddInvoiceModal";
import InvoicesTable from "../containers/Invoice/Table";
import useFetchPaginateInvoices from "../hooks/invoice/useFetchPaginateInvoices";
import PageLayuot from "../layout/PageLayout";

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
            {isLoading && (
                <div className="w-full flex flex-col justify-center items-center py-20">
                    <Loader size={48} className="animate-spin text-teal-500 dark:text-teal-400 mb-4" />
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        در حال بارگیری داده‌ها...
                    </span>
                </div>
            )}

            {!isLoading && (
                <>
                    <InvoicesTable records={data?.items} meta={data?.meta} />
                    <AddInvoiceModal />
                </>
            )}
        </PageLayuot>
    )
}