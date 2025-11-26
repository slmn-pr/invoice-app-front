import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchCusomersReq } from "../../api/customers";

const DEFAULT_META = {
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
};

export default function useFetchOwnerCustomers(ownerId, options = { page: 1, limit: 10 }) {
  const { page = 1, limit = 10 } = options || {};

  return useQuery({
    queryKey: ["owner-customers", ownerId, page, limit],
    enabled: Boolean(ownerId),
    placeholderData: { items: [], meta: { ...DEFAULT_META, page, limit } },
    queryFn: async () => {
      if (!ownerId) {
        return { items: [], meta: { ...DEFAULT_META, page, limit } };
      }
      const { data } = await fetchCusomersReq({
        page,
        limit,
        ownerId,
      });

      if (!data?.success) {
        throw new Error(data?.error || "خطا هنگام دریافت مشتریان");
      }

      return {
        items: data.data.items,
        meta: data.data.meta,
      };
    },
    onError: (error) => {
      toast.error(error.message || "خطا در دریافت مشتریان کاربر");
    },
  });
}

