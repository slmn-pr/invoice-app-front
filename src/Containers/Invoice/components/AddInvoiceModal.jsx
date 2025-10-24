import AddInvoiceForm from "./AddInvoiceForm";

export default function AddInvoiceModal() {
    return <>
        <dialog id="add_invoice_modal" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
                <h2 className="text-xl font-bold text-primary mb-4">
                    افزودن فاکتور جدید
                </h2>
                <div className="modal-action justify-start w-full">
                    <AddInvoiceForm />
                </div>
            </div>
        </dialog>
    </>
}