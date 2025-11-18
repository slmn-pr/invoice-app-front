import { FormProvider, useForm } from "react-hook-form";
import AddCustomerForm from "../components/AddCustomerForm";
import useFetchCustomerInfo from "../../../hooks/customer/useFetchCustomerInfo";
import { useEffect, useState } from "react";
import { SquarePen } from "lucide-react";
import useEditCustomer from "../../../hooks/customer/useEditCustomer";

export default function EditCustomerModal({ id }) {

    const [enabled, setEnabled] = useState(false)


    const { data, isLoading } = useFetchCustomerInfo(enabled, id);


    const methods = useForm({
        defaultValues: {
            "name": "",
            "email": "",
            "phone": ""
        }
    })

    function onCloseModal() {
        methods.reset();
        document.getElementById('edit_customer_modal').close()
        setEnabled(false)
    }


    function onOpenModal() {
        document.getElementById('edit_customer_modal').showModal();

        // Fetch customer info from db
        setEnabled(true)
    }
    const { isPending, mutate } = useEditCustomer(id);

    function handleEditCustomer(values) {
        return mutate(values, {
            onSuccess: onCloseModal
        })
    }


    useEffect(() => {
        if (data && typeof data === "object") {
            methods.reset({
                email: data.email,
                name: data.name,
                phone: data.phone
            })
        }
    }, [data, methods])

    return <>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button 
            className="p-2 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-colors"
            onClick={onOpenModal} 
            disabled={!id}
            title="ویرایش"
        >
            <SquarePen size={18} />
        </button>
        <dialog id="edit_customer_modal" className="modal" >

            <div className="modal-box">
                <h2 className="text-xl font-bold mb-4">
                    ویرایش مشتری
                </h2>
                <FormProvider {...methods}>
                    <AddCustomerForm onSubmit={handleEditCustomer} onClose={onCloseModal} isPending={isPending} />
                </FormProvider>
            </div>


        </dialog>
    </>
}