import { useQuery } from "@tanstack/react-query";
import { fetchCusomersReq } from "../../api/customers";
import { useSearchParams } from "react-router-dom";

const DEFAULT_LIMIT = 10;

export default function useFetchPaginateCustomers() {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ? +searchParams.get("page") : 1;
  const limit = searchParams.get("limit")
    ? +searchParams.get("limit")
    : DEFAULT_LIMIT;

  const fetchCustomers = async () => {
    const { data } = await fetchCusomersReq({
      limit: limit,
      page: page,
    });

    if (!data?.success) {
      throw new Error(data?.error || "خطا در دریافت لیست مشتری‌ها");
    }

    return {
      items: data.data.items,
      meta: data.data.meta,
    };
  };

  return useQuery({
    queryKey: ["fetch-paginate-customers", page, limit],
    queryFn: fetchCustomers,
    initialPageParam: 1,
  });
}
