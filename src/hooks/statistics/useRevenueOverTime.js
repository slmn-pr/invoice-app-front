import { useQuery } from "@tanstack/react-query";
import { getRevenueOverTime } from "../../api/statistics";
import toast from "react-hot-toast";

export default function useRevenueOverTime(params = {}) {
  async function fetchRevenue() {
    try {
      const { data } = await getRevenueOverTime(params);

      if (data?.success) {
        return data.data;
      } else {
        toast.error(data?.data?.error || "خطا در دریافت آمار درآمد");
        return [];
      }
    } catch (error) {
      toast.error("بارگیری آمار درآمد با خطا مواجه شد");
      console.error("[useRevenueOverTime] error: ", error);
      return [];
    }
  }

  return useQuery({
    queryKey: ["revenue-over-time", params],
    queryFn: fetchRevenue,
  });
}

