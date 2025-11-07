import { useFormContext } from "react-hook-form"
import useFetchCustomers from "../../../../hooks/customer/useFetchCustomers"

export default function SelectCustomerInput() {
    const { data, hasNextPage } = useFetchCustomers()
    const customers = data?.items || []

    const { register } = useFormContext()

    return <select
        {...register("customerId", { required: false })}
        className="select select-bordered w-full text-right"
    >
        <option value="">انتخاب مشتری</option>
        {customers.map((c) => (
            <option key={c.id} value={c.id}>
                {c.name} ({c.email})
            </option>
        ))}

        {hasNextPage && <button>نمایش بیشتر</button>}
    </select>
}