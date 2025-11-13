import { useQuery } from "@tanstack/react-query";
import { getAllInvoices } from "../../api/invoices";
import toast from "react-hot-toast";

const INITIAL_API_PAYLOAD = {
  page: 1,
  limit: 10,
  customerId: undefined,
};

export default function useFetchPaginateInvoices(
  apiPayload = INITIAL_API_PAYLOAD
) {
  async function fetchInvoices() {
    try {
      const { data } = await getAllInvoices();

      if (data?.success) {
        return {
          items: data.data.items,
          meta: data.data.meta,
        };
      } else {
        toast.error(data.data.error);
        return {
          items: [],
          meta: {},
        };
      }
    } catch (error) {
      toast.error("بارگیری فاکتور ها با خطا مواجه شد");
      console.error("[useFetchPaginateInvoices] error: ", error);
    }
  }

  return useQuery({
    queryKey: ["fetchPaginateInvoices", apiPayload],
    queryFn: fetchInvoices,
  });
}
