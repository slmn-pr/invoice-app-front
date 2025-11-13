import { useNavigate } from "react-router-dom"
import { Download } from "lucide-react";
import { useMemo } from "react";

export default function InvoiceTableBodyRow({ record = {}, page = 1, index = 1 }) {
    const naviagtion = useNavigate()



    const invoiceIndexNumber = useMemo(() => page * index, [page, index]);
    const invoiceID = useMemo(() => {
        if (!record?.id || typeof record.id != "string") return null;

        let lastSectionOfUUID = record.id.split("-").at(-1)
        let newID = `INV-${lastSectionOfUUID.toUpperCase()}`
        return newID;

    }, [record.id])


    const onDownloadClick = () => {
        naviagtion('/preview', {
            state: {
                invoiceID
            }
        })
    }

    return <tr>

        {/* Index */}
        <td className="w-20 border border-gray-300 p-2">{invoiceIndexNumber}</td>

        {/* Invoice number */}
        <td className="w-32 border border-gray-300 p-2">{invoiceID}</td>

        {/* Customer name (full name) */}
        <td className="w-80 border border-gray-300 p-2">سلمان سلیمان پور</td>

        {/* Status */}
        <td className="w-32 border border-gray-300 p-2">{record?.status || "نا مشخص"}</td>

        {/* Download button */}
        <td className="w-32 border border-gray-300 p-2">

            <button className="btn-sm btn btn-circle btn-info" onClick={onDownloadClick}>
                <Download color="#fff" size={18} />
            </button>

        </td>
    </tr>
}