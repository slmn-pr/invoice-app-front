import { useEffect } from "react";
import AddInvoiceModal from "../Containers/Invoice/components/AddInvoiceModal";
import InvoicesTable from "../Containers/Invoice/Table";
import { getAllInvoices } from "../api/invoices";

export default function InvoicesPage() {



    useEffect(() => {

        getAllInvoices().then((response) => {
            console.log("[InvoicesPage] getAllInvoices, result", response);
        }).catch((error) => {
            console.log("[InvoicesPage] getAllInvoices, error", error);
        })
    }, [])


    const onAddInvoice = () => {
        // add_invoice_modal
        document.getElementById('add_invoice_modal').showModal()
    }

    return <div className="space-y-5">

        {/* Hader and page title */}
        <div className="w-full h-20 bg-teal-400 flex items-center justify-between rounded px-5">
            <h2 className="font-bold text-3xl text-white ">
                مدیریت فاکتور ها
            </h2>

            <button onClick={onAddInvoice} className="bg-white text-gray-900 p-3 rounded cursor-pointer">صدور فاکتور جدید</button>
        </div>

        {/* Action buttons */}


        {/* Table */}
        <InvoicesTable />

        {/* Modal */}
        <AddInvoiceModal />
    </div>
}