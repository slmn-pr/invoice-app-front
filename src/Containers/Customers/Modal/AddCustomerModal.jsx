import { FormProvider, useForm } from "react-hook-form";
import AddCustomerForm from "../components/AddCustomerForm";
import useInsertCustomer from "../../../hooks/customer/useInsertCustomer";

export default function AddCustomerModal({ buttonContent = "Open modal" }) {

    const methods = useForm({
        defaultValues: {
            "name": "",
            "email": "",
            "phone": ""
        }
    })

    const onCloseModal = () => {
        methods.reset();
        document.getElementById('add_customer_modal').close()
    }

    const { isPending, mutate } = useInsertCustomer()

    function handleMuatate(values) {
        mutate(values, {
            onSuccess: () => {
                onCloseModal();
            }
        })


    }

    return <>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn" onClick={() => document.getElementById('add_customer_modal').showModal()}>{buttonContent}</button>
        <dialog id="add_customer_modal" className="modal" >

            <div className="modal-box">
                <h2 className="text-xl font-bold  mb-4">
                    افزودن مشتری جدید
                </h2>
                <FormProvider {...methods}>
                    <AddCustomerForm onSubmit={handleMuatate} onClose={onCloseModal} isPending={isPending} />
                </FormProvider>
            </div>


        </dialog>
    </>
}