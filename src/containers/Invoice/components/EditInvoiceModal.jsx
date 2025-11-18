import { FormProvider } from "react-hook-form";
import AddInvoiceForm from "./AddInvoiceForm";
import useFetchInvoiceDetail from "../../../hooks/invoice/useFetchInvoiceDetail";
import { useState } from "react";
import { SquarePen, BadgeAlert } from "lucide-react";
import useEditInvoice from "../../../hooks/invoice/useEditInvoice";

export default function EditInvoiceModal({ id }) {
  const [enabled, setEnabled] = useState(false);

  const { data, isLoading } = useFetchInvoiceDetail(enabled ? id : null);


  const modalId = `edit_invoice_modal_${id}`;

  function onCloseModal() {
    document.getElementById(modalId).close();
    setEnabled(false);
  }

  function onOpenModal() {
    document.getElementById(modalId).showModal();
    // Fetch invoice info from db
    setEnabled(true);
  }

  const { isPending, mutate, error } = useEditInvoice(id);

  function handleEditInvoice(values) {
    return mutate(values, {
      onSuccess: onCloseModal,
    });
  }

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="p-2 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-colors"
        onClick={onOpenModal}
        disabled={!id}
        title="ویرایش"
      >
        <SquarePen size={18} />
      </button>
      <dialog id={modalId} className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h2 className="text-xl font-bold text-primary mb-4">
            ویرایش فاکتور
          </h2>

          {/* Loading state */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <span className="text-gray-500">در حال بارگیری...</span>
            </div>
          )}

          {/* Error alert */}
          {error?.message && (
            <div className="alert alert-error">
              <BadgeAlert />
              <span>{error.message}</span>
            </div>
          )}

          {/* Form section */}
          {!isLoading && (
            <div className="modal-action justify-start w-full">
                <AddInvoiceForm
                  defaultValues={data}
                  onSubmit={handleEditInvoice}
                  onClose={onCloseModal}
                  isPending={isPending}
                  submitText="ویرایش فاکتور"
                />
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}

