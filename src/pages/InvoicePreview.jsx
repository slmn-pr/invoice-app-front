import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function InvoicePreviewPage() {
    const printRef = useRef();

    // داده‌های تستی (mock)
    const invoice = {
        invoiceNumber: "INV-2025-001",
        issueDate: "2025-10-23",
        dueDate: "2025-11-05",
        customerId: "CUST-203",
        status: "پرداخت شده",
        items: [
            {
                description: "طراحی رابط کاربری",
                quantity: 1,
                unitPrice: 750000,
                taxRate: 9,
            },
            {
                description: "توسعه بک‌اند",
                quantity: 2,
                unitPrice: 500000,
                taxRate: 9,
            },
            {
                description: "پشتیبانی و نگهداری سیستم",
                quantity: 1,
                unitPrice: 300000,
                taxRate: 0,
            },
        ],
    };

    // تابع خروجی PDF
    const exportToPDF = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${invoice.invoiceNumber}.pdf`);
    };

    // تابع خروجی تصویر
    const exportToImage = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const img = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = img;
        link.download = `${invoice.invoiceNumber}.png`;
        link.click();
    };

    const totalAmount = invoice.items.reduce(
        (sum, item) =>
            sum + item.quantity * item.unitPrice * (1 + item.taxRate / 100),
        0
    );

    return (
        <div className="w-full text-right p-6 min-h-screen bg-[#f9fafb]" dir="rtl">
            {/* دکمه‌های خروجی */}
            <div className="flex justify-end gap-3 mb-4">
                <button
                    className="btn btn-outline btn-sm border-[#14b8a6] text-[#14b8a6]"
                    onClick={exportToImage}
                >
                    خروجی تصویر
                </button>
                <button
                    className="btn btn-sm text-white"
                    style={{ backgroundColor: "#14b8a6", borderColor: "#14b8a6" }}
                    onClick={exportToPDF}
                >
                    خروجی PDF
                </button>
            </div>

            <div
                ref={printRef}
                className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200 max-w-3xl mx-auto space-y-6"
            >
                {/* هدر فاکتور */}
                <div
                    className="flex justify-between items-center border-b pb-4"
                    style={{ borderColor: "#e5e7eb" }}
                >
                    <div>
                        <h1 className="text-2xl font-bold" style={{ color: "#14b8a6" }}>
                            فاکتور فروش
                        </h1>
                        <p className="text-gray-500 text-sm">
                            سیستم مدیریت فاکتور (نسخه تستی)
                        </p>
                    </div>
                    <div className="text-left text-sm">
                        <p className="font-semibold text-gray-700">
                            شماره فاکتور: {invoice.invoiceNumber}
                        </p>
                        <p className="text-gray-500">تاریخ صدور: {invoice.issueDate}</p>
                        <p className="text-gray-500">تاریخ سررسید: {invoice.dueDate}</p>
                    </div>
                </div>

                {/* مشخصات مشتری */}
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                        <p>
                            <span className="font-semibold">شناسه مشتری:</span>{" "}
                            {invoice.customerId}
                        </p>
                    </div>
                    <div>
                        <p>
                            <span className="font-semibold">وضعیت فاکتور:</span>{" "}
                            <span
                                className="badge text-white"
                                style={{
                                    backgroundColor:
                                        invoice.status === "پرداخت شده"
                                            ? "#22c55e"
                                            : invoice.status === "ارسال شده"
                                                ? "#0284c7"
                                                : "#9ca3af",
                                }}
                            >
                                {invoice.status}
                            </span>
                        </p>
                    </div>
                </div>

                {/* جدول آیتم‌ها */}
                <div className="overflow-x-auto">
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
                            {invoice.items.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.description}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.unitPrice.toLocaleString("fa-IR")}</td>
                                    <td>{item.taxRate}</td>
                                    <td>
                                        {(
                                            item.quantity *
                                            item.unitPrice *
                                            (1 + item.taxRate / 100)
                                        ).toLocaleString("fa-IR")}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* جمع کل */}
                <div
                    className="flex justify-between items-center border-t pt-4 text-lg"
                    style={{ borderColor: "#e5e7eb" }}
                >
                    <span className="font-bold text-gray-700">جمع کل:</span>
                    <span className="font-bold" style={{ color: "#14b8a6" }}>
                        {totalAmount.toLocaleString("fa-IR")} تومان
                    </span>
                </div>

                {/* امضا */}
                <div className="flex justify-end mt-8 text-sm text-gray-500">
                    <div className="text-center">
                        <p>امضا و مهر فروشنده</p>
                        <div
                            className="mt-8 border-t w-32 mx-auto"
                            style={{ borderColor: "#9ca3af" }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
