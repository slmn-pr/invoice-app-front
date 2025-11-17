import { useRef } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "../containers/Invoice/components/InvoicePDF";
import useFetchInvoiceDetail from "../hooks/invoice/useFetchInvoiceDetail";
import { useParams } from "react-router-dom";
import { sanitizeInvoiceID } from "../utils";
import InvoicePreviewContainer from "../containers/InvoicePreview";

export default function InvoicePreviewPage() {
    const printRef = useRef();

    const { id } = useParams()
    console.log("[InvoicePreviewPage] state", id);


    const { data: invoice = { items: [] } } = useFetchInvoiceDetail(id)


    const invoiceID = sanitizeInvoiceID(id)


    return (
        <div className="w-full text-right p-6 min-h-screen bg-[#f9fafb]" dir="rtl">
            {/* دکمه‌های خروجی */}
            <div className="flex justify-end gap-3 mb-4">
                {/* <button
                    className="btn btn-outline btn-sm border-[#14b8a6] text-[#14b8a6]"
                // onClick={exportToImage}
                >
                    خروجی تصویر
                </button> */}

                {/* PDF Download */}
                <PDFDownloadLink
                    document={<InvoicePDF invoice={invoice} />}
                    fileName={`invoice-${invoiceID}.pdf`}
                >
                    {({ loading }) =>
                        loading ? (
                            <button className="btn btn-outline btn-primary">در حال آماده‌سازی...</button>
                        ) : (
                            <button className="btn btn-primary">دانلود PDF فاکتور</button>
                        )
                    }
                </PDFDownloadLink>
            </div>

            <div
                ref={printRef}
                className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200 max-w-3xl mx-auto space-y-6"
            >
                <InvoicePreviewContainer invoice={invoice} />
            </div>
        </div>
    );
}
