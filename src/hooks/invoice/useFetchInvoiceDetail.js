import { useQuery } from "@tanstack/react-query";
import { getInvoiceDetailReq } from "../../api/invoices";
import toast from "react-hot-toast";

export default function useFetchInvoiceDetail(invoiceID) {
  async function fethcInvoiceDetail() {
    try {
      const { data } = await getInvoiceDetailReq(invoiceID);
      if (data?.success) {
        return data.data;
      } else {
        toast.error(data.data.error);
      }
    } catch {
      toast.error("!بارگیری اطلاعات فاکتور با خطا جواجه شد");
      return false;
    }
  }
  return useQuery({
    enabled: !!invoiceID,
    queryKey: ["fetch-invoice-detail", invoiceID],
    queryFn: fethcInvoiceDetail,
  });
}
