import { sanitizeCustomerID, sanitizeInvoiceID } from "../../utils";

export default function InvoicePreviewContainer({ invoice = { items: [] } }) {

    const customerID = sanitizeCustomerID(invoice?.customerId)
    const invoiceID = sanitizeInvoiceID(invoice?.id)




    const totalAmount = invoice.items?.reduce(
        (sum, item) =>
            sum + item.quantity * item.unitPrice * (1 + item.taxRate / 100),
        0
    );
    return <>
        {/* Title */}
        <div>
            <h1 className="text-2xl font-bold" style={{ color: "#14b8a6" }}>
                فاکتور فروش
            </h1>
            <p className="text-gray-500 text-sm">
                سیستم مدیریت فاکتور (نسخه تستی)
            </p>
        </div>

        {/* هدر فاکتور */}
        <div
            className="flex justify-between items-start border-b pb-4"
            style={{ borderColor: "#e5e7eb" }
            }
        >

            {/* Invoice detail */}
            <div className="text-left text-sm">
                <p className="font-semibold text-gray-700">
                    شماره فاکتور: {invoiceID}
                </p>
                <p className="text-gray-500 text-right">تاریخ صدور: {invoice?.issueDate}</p>
                <p className="text-gray-500 text-right">تاریخ سررسید: {invoice?.dueDate}</p>
            </div>



            {/* Customer detail */}
            <div className="text-left text-sm">
                <p>
                    <span className="font-semibold">شناسه مشتری:</span>{" "}
                    {customerID}
                </p>
                <p className="text-gray-500 text-right">نام مشتری: {invoice.customer?.name}</p>
                <p className="text-gray-500 text-right">تلفن مشتری: {invoice.customer?.phone}</p>
            </div>


            <div className="gap-4 text-sm text-gray-700" >
                <p>
                    <span className="font-semibold">وضعیت فاکتور:</span>{" "}
                    <span
                        className="badge text-white"
                        style={{
                            backgroundColor:
                                invoice?.status === "پرداخت شده"
                                    ? "#22c55e"
                                    : invoice?.status === "ارسال شده"
                                        ? "#0284c7"
                                        : "#9ca3af",
                        }}
                    >
                        {invoice?.status}
                    </span>
                </p>
            </div >



        </div>

        {/* جدول آیتم‌ها */}
        < div className="overflow-x-auto" >


            <table className="table w-full mt-4 border border-gray-300">
                <thead style={{ backgroundColor: "#99f6e4", color: "#1f2937" }}>
                    <tr className="text-center">
                        <th>شرح</th>
                        <th>تعداد</th>
                        <th>قیمت واحد (تومان)</th>
                        <th>مالیات (%)</th>
                        <th>جمع (تومان)</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {invoice.items?.map((item, i) => (
                        <tr key={i}>
                            {/* Description */}
                            <td>{item.description}</td>

                            {/* Quantity */}
                            <td>{item.quantity}</td>

                            {/* Unite price */}
                            <td>{item?.unitPrice?.toLocaleString("fa-IR")}</td>

                            {/* Tax rate */}
                            <td>{item.taxRate}</td>

                            {/* Item Total price */}
                            <td>
                                {(
                                    item.quantity *
                                    item.unitPrice *
                                    (1 + item.taxRate / 100)
                                )?.toLocaleString("fa-IR")}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >

        {/* جمع کل */}
        < div
            className="flex justify-between items-center border-t pt-4 text-lg"
            style={{ borderColor: "#e5e7eb" }}
        >
            <span className="font-bold text-gray-700">جمع کل:</span>
            <span className="font-bold" style={{ color: "#14b8a6" }}>
                {totalAmount?.toLocaleString("fa-IR")} تومان
            </span>
        </div >

        {/* امضا */}
        <div className="flex justify-end mt-8 text-sm text-gray-500" >
            <div className="text-center">
                <p>امضا و مهر فروشنده</p>
                <div
                    className="mt-8 border-t w-32 mx-auto"
                    style={{ borderColor: "#9ca3af" }}
                ></div>
            </div>
        </div >
    </>
}