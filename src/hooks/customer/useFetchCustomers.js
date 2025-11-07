import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCusomersReq } from "../../api/customers";

const DEFAULT_LIMIT = 10;

export default function useFetchCustomers() {
  const fetchCustomers = async ({ pageParam = 1 }) => {
    console.log("[useFetchCustomers] fetchCustomers, pageParam:", pageParam);

    const { data } = await fetchCusomersReq({
      limit: DEFAULT_LIMIT,
      page: pageParam,
    });

    if (!data?.success) {
      throw new Error(data?.error || "خطا در دریافت لیست مشتری‌ها");
    }

    return {
      items: data.data.items,
      meta: data.data.meta,
    };
  };

  return useInfiniteQuery({
    queryKey: ["fetchCustomers"],
    queryFn: fetchCustomers,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.meta;
      return page < totalPages ? page + 1 : undefined;
    },
    select: (data) => {
      // flatten all pages
      const allItems = data.pages.flatMap((page) => page.items);
      return {
        items: allItems,
        total: allItems.length,
        hasMore:
          data.pages[data.pages.length - 1].meta.page <
          data.pages[data.pages.length - 1].meta.totalPages,
      };
    },
  });
}
