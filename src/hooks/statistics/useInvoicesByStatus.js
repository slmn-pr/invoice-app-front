import { useQuery } from "@tanstack/react-query";
import { getInvoicesByStatus } from "../../api/statistics";
import toast from "react-hot-toast";

export default function useInvoicesByStatus(params = {}) {
  async function fetchInvoicesByStatus() {
    try {
      const { data } = await getInvoicesByStatus(params);

      if (data?.success) {
        return data.data;
      } else {
        toast.error(data?.data?.error || "خطا در دریافت آمار فاکتورها");
        return [];
      }
    } catch (error) {
      toast.error("بارگیری آمار فاکتورها با خطا مواجه شد");
      console.error("[useInvoicesByStatus] error: ", error);
      return [];
    }
  }

  return useQuery({
    queryKey: ["invoices-by-status", params],
    queryFn: fetchInvoicesByStatus,
  });
}

