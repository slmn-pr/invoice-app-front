import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import InvoiceItemsTable from "./InvoiceItemsTable";

export default function AddInvoiceForm({ onSubmit, customers = [] }) {
    const methods = useForm({
        defaultValues: {
            issueDate: "",
            dueDate: "",
            customerId: "",
            status: "پیش‌نویس",
            items: [{ description: "", quantity: 1, unitPrice: 0, taxRate: 0 }],
        },
    });

    const { handleSubmit, watch, register } = methods;

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
                {/* فیلدهای اطلاعات اصلی */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label justify-end">
                            <span className="label-text text-gray-700">مشتری</span>
                        </label>
                        <select
                            {...register("customerId", { required: false })}
                            className="select select-bordered w-full text-right"
                        >
                            <option value="">انتخاب مشتری</option>
                            {customers.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name} ({c.email})
                                </option>
                            ))}
                        </select>
                    </div>

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
                <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        className="btn bg-teal-500 hover:bg-teal-600 text-white px-8"
                    >
                        ثبت فاکتور
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}
