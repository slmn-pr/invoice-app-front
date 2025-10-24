import { Download } from "lucide-react";
import { INVOICE_TABLE_HEADERS } from "./consts";
import { useNavigate } from "react-router-dom";

export default function InvoicesTable() {

    const naviagtion = useNavigate()

    const onDownloadClick = () => {
        naviagtion('/preview', {
            state: {
                invoiceID: 11
            }
        })
    }

    return <table className="w-full">
        <thead>
            <tr>
                {INVOICE_TABLE_HEADERS.map((item, index) => (<th key={`${item}-${index}`} className="w-20 border border-gray-300 p-2">{item}</th>))}
            </tr>
        </thead>

        <tbody>
            <tr>
                <td className="w-20 border border-gray-300 p-2">1</td>
                <td className="w-32 border border-gray-300 p-2">111</td>
                <td className="w-80 border border-gray-300 p-2">سلمان سلیمان پور</td>
                <td className="w-32 border border-gray-300 p-2">پرداخت شده</td>
                <td className="w-32 border border-gray-300 p-2">

                    <button className="btn-sm btn btn-circle btn-info" onClick={onDownloadClick}>
                        <Download color="#fff" size={18} />
                    </button>

                </td>
            </tr>
        </tbody>

    </table>

}