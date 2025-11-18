import { useQuery } from "@tanstack/react-query";
import { getRecentInvoices } from "../../api/statistics";
import toast from "react-hot-toast";

export default function useRecentInvoices(params = { limit: 5 }) {
  async function fetchRecentInvoices() {
    try {
      const { data } = await getRecentInvoices(params);

      if (data?.success) {
        return data.data;
      } else {
        toast.error(data?.data?.error || "خطا در دریافت فاکتورهای اخیر");
        return [];
      }
    } catch (error) {
      toast.error("بارگیری فاکتورهای اخیر با خطا مواجه شد");
      console.error("[useRecentInvoices] error: ", error);
      return [];
    }
  }

  return useQuery({
    queryKey: ["recent-invoices", params],
    queryFn: fetchRecentInvoices,
  });
}

