import { LoaderCircle } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function AddCustomerForm({ onSubmit, onClose, isPending = false }) {



    const { handleSubmit, register } = useFormContext();


    return <form onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-6 text-right p-4"
        dir="rtl">
        <div className="grid gap-y-4">

            {/* Name */}
            <div className="form-control">
                <label className="label justify-end">
                    <span className="label-text text-gray-700">نام</span>
                    <input type="text" placeholder="Type here" className="input"  {...register("name", { required: true })} />
                </label>
            </div>


            {/* Email */}
            <div className="form-control">
                <label className="label justify-end">
                    <span className="label-text text-gray-700">ایمیل</span>
                    <input type="email" placeholder="Type here" className="input"  {...register("email", { required: true })} />
                </label>
            </div>

            {/* Phone */}
            <div className="form-control">
                <label className="label justify-end">
                    <span className="label-text text-gray-700">تلفن</span>
                    <input type="tel" placeholder="Type here" className="input"  {...register("phone", { required: true })} />
                </label>
            </div>


            <div className="flex justify-end mt-6 gap-x-2">
                <button
                    type="button"
                    disabled={isPending}
                    className="btn bg-red-500 hover:bg-red-600 text-white px-8"
                    onClick={onClose}
                >
                    انصراف
                </button>

                <button
                    type="submit"
                    disabled={isPending}
                    className="btn bg-teal-500 hover:bg-teal-600 text-white px-8"
                >

                    {isPending && <LoaderCircle className="animate-spin" color="#fff" size={18} />}
                    {!isPending && <span>
                        ثبت</span>}
                </button>
            </div>
        </div>
    </form>
}