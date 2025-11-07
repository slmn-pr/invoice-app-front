import AddInvoiceForm from "./AddInvoiceForm";
import useInsertInvoice from "../../../hooks/invoice/useInsertInvoice";
import { BadgeAlert } from "lucide-react";
import { useCallback } from "react";
import toast from "react-hot-toast";

export default function AddInvoiceModal() {

    const { mutate, error } = useInsertInvoice()


    const handleMutate = useCallback((values) => {
        return mutate(values, {
            onSuccess: () => {
                document.getElementById('add_invoice_modal').close()
                toast.success("فاکتور جدید با موفقیت صادر شد")
            }
        })
    }, [mutate])

    return <>
        <dialog id="add_invoice_modal" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
                <h2 className="text-xl font-bold text-primary mb-4">
                    افزودن فاکتور جدید
                </h2>

                {/* Error alert */}
                {error?.message && <div className="alert alert-error">
                    <BadgeAlert />
                    <span>{error.message}</span>
                </div>}

                {/* Form section */}
                <div className="modal-action justify-start w-full">
                    <AddInvoiceForm onSubmit={handleMutate} />
                </div>
            </div>
        </dialog>
    </>
}