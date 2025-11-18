import { useQuery } from "@tanstack/react-query";
import { getTopCustomers } from "../../api/statistics";
import toast from "react-hot-toast";

export default function useTopCustomers(params = { limit: 10 }) {
  async function fetchTopCustomers() {
    try {
      const { data } = await getTopCustomers(params);

      if (data?.success) {
        return data.data;
      } else {
        toast.error(data?.data?.error || "خطا در دریافت مشتریان برتر");
        return [];
      }
    } catch (error) {
      toast.error("بارگیری مشتریان برتر با خطا مواجه شد");
      console.error("[useTopCustomers] error: ", error);
      return [];
    }
  }

  return useQuery({
    queryKey: ["top-customers", params],
    queryFn: fetchTopCustomers,
  });
}

