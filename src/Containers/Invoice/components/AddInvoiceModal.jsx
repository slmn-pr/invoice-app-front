import AddInvoiceForm from "./AddInvoiceForm";
import { insertInvoice } from "../../../api/invoices";

export default function AddInvoiceModal() {

    const onInsertInvoice = (invoice) => {
        console.log("[AddInvoiceModal] insertInvoice", invoice);

        insertInvoice(invoice).then((response) => {
            console.log("[AddInvoiceModal] insertInvoice, response", response);
        }).catch((error) => {
            console.log("[AddInvoiceModal] insertInvoice, error", error);
        })
    }

    return <>
        <dialog id="add_invoice_modal" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
                <h2 className="text-xl font-bold text-primary mb-4">
                    افزودن فاکتور جدید
                </h2>
                <div className="modal-action justify-start w-full">
                    <AddInvoiceForm  onSubmit={onInsertInvoice}/>
                </div>
            </div>
        </dialog>
    </>
}