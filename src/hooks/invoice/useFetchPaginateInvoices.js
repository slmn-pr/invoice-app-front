import { useQuery } from "@tanstack/react-query";
import { getAllInvoices } from "../../api/invoices";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const DEFAULT_LIMIT = 10;

export default function useFetchPaginateInvoices() {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ? +searchParams.get("page") : 1;
  const limit = searchParams.get("limit") ? +searchParams.get("limit") : DEFAULT_LIMIT;

  const apiPayload = {
    page,
    limit,
  };

  async function fetchInvoices() {
    try {
      const { data } = await getAllInvoices(apiPayload);

      if (data?.success) {
        return {
          items: data.data.items,
          meta: data.data.meta,
        };
      } else {
        toast.error(data.data.error || "خطا در دریافت فاکتورها");
        return {
          items: [],
          meta: {},
        };
      }
    } catch (error) {
      toast.error("بارگیری فاکتور ها با خطا مواجه شد");
      console.error("[useFetchPaginateInvoices] error: ", error);
      return {
        items: [],
        meta: {},
      };
    }
  }

  return useQuery({
    queryKey: ["fetchPaginateInvoices", apiPayload],
    queryFn: fetchInvoices,
  });
}
