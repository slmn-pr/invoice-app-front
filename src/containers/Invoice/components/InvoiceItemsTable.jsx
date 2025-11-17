import { useFormContext, useFieldArray } from "react-hook-form";

export default function InvoiceItemsTable() {
    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });

    return (
        <div className="overflow-x-auto">
            <div className="divider">آیتم‌ها</div>

            <table className="table text-right">
                <thead>
                    <tr>
                        <th>توضیحات</th>
                        <th>تعداد</th>
                        <th>قیمت واحد</th>
                        <th>مالیات (%)</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {fields.map((item, index) => (
                        <tr key={item.id}>
                            <td>
                                <input
                                    {...register(`items.${index}.description`)}
                                    className="input input-bordered w-full text-right"
                                    placeholder="مثلاً طراحی سایت"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                                    className="input input-bordered w-full text-right"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    {...register(`items.${index}.unitPrice`, { valueAsNumber: true })}
                                    className="input input-bordered w-full text-right"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    {...register(`items.${index}.taxRate`, { valueAsNumber: true })}
                                    className="input input-bordered w-full text-right"
                                />
                            </td>
                            <td className="text-center">
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="btn btn-error btn-sm"
                                >
                                    ✕
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-start mt-3">
                <button
                    type="button"
                    onClick={() =>
                        append({ description: "", quantity: 1, unitPrice: 0, taxRate: 0 })
                    }
                    className="btn btn-outline btn-primary btn-sm"
                >
                    افزودن آیتم +
                </button>
            </div>
        </div>
    );
}
