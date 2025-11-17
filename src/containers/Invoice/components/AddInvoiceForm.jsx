import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import InvoiceItemsTable from "./InvoiceItemsTable";
import SelectCustomerInput from "./form/SelectCustomerInput";

export default function AddInvoiceForm({ onSubmit, onClose, isPending = false, submitText, defaultValues ={
    issueDate: "",
    dueDate: "",
    customerId: "",
    status: "پیش‌نویس",
    items: [{ description: "", quantity: 1, unitPrice: 0, taxRate: 0 }],
} }) {
    const methods = useForm({
        defaultValues: defaultValues
    });

    const { handleSubmit, watch, register, reset } = methods;

    // Reset form when defaultValues change (for edit mode)
    // Only reset if defaultValues has an id (indicating it's invoice data from API)
    useEffect(() => {
        if (defaultValues?.id) {
            reset({
                customerId: defaultValues.customerId || "",
                issueDate: defaultValues.issueDate || "",
                dueDate: defaultValues.dueDate || "",
                status: defaultValues.status || "پیش‌نویس",
                items: defaultValues.items && Array.isArray(defaultValues.items) 
                    ? defaultValues.items 
                    : [{ description: "", quantity: 1, unitPrice: 0, taxRate: 0 }],
            });
        }
    }, [defaultValues?.id, reset]);

    const formatCurrency = (value) =>
        value
            .toLocaleString("fa-IR", {
                style: "currency",
                currency: "IRR",
            })
            .replace("ریال", "تومان");

    const total = watch("items").reduce(
        (sum, item) =>
            sum + item.quantity * item.unitPrice * (1 + item.taxRate / 100),
        0
    );

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full space-y-6 text-right p-4"
                dir="rtl"
            >
                <div className="grid md:grid-cols-2 gap-4">

                    {/* Customer */}
                    <div className="form-control">
                        <label className="label justify-end">
                            <span className="label-text text-gray-700">مشتری</span>
                        </label>
                        <SelectCustomerInput />
                    </div>

                    {/* Issue date */}
                    <div className="form-control">
                        <label className="label justify-end">
                            <span className="label-text text-gray-700">تاریخ صدور</span>
                        </label>
                        <input
                            type="date"
                            {...register("issueDate", { required: true })}
                            className="input input-bordered w-full text-right"
                        />
                    </div>


                    {/* Due date */}
                    <div className="form-control">
                        <label className="label justify-end">
                            <span className="label-text text-gray-700">تاریخ سررسید</span>
                        </label>
                        <input
                            type="date"
                            {...register("dueDate", { required: true })}
                            className="input input-bordered w-full text-right"
                        />
                    </div>
                </div>

                {/* جدول آیتم‌ها */}
                <InvoiceItemsTable />

                {/* بخش وضعیت و جمع کل */}
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="form-control">
                        <label className="label justify-end">
                            <span className="label-text text-gray-700">وضعیت فاکتور</span>
                        </label>
                        <select
                            {...register("status")}
                            className="select select-bordered w-full text-right"
                        >
                            <option>پیش‌نویس</option>
                            <option>ارسال شده</option>
                            <option>پرداخت شده</option>
                            <option>لغو شده</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label justify-end">
                            <span className="label-text text-gray-700">جمع کل</span>
                        </label>
                        <input
                            type="text"
                            value={formatCurrency(total)}
                            disabled
                            className="input input-bordered bg-gray-100 text-right font-bold text-teal-600"
                        />
                    </div>
                </div>

                {/* دکمه ارسال */}
                <div className="flex justify-end mt-6 gap-x-2">
                    {onClose && (
                        <button
                            type="button"
                            disabled={isPending}
                            onClick={onClose}
                            className="btn bg-red-500 hover:bg-red-600 text-white px-8"
                        >
                            انصراف
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="btn bg-teal-500 hover:bg-teal-600 text-white px-8"
                    >
                        {submitText || "ثبت فاکتور"}
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}
