import { useQuery } from "@tanstack/react-query";
import { getStatisticsOverview } from "../../api/statistics";
import toast from "react-hot-toast";

export default function useStatisticsOverview(params = {}) {
  async function fetchOverview() {
    try {
      const { data } = await getStatisticsOverview(params);

      if (data?.success) {
        return data.data;
      } else {
        toast.error(data?.data?.error || "خطا در دریافت آمار");
        return null;
      }
    } catch (error) {
      toast.error("بارگیری آمار با خطا مواجه شد");
      console.error("[useStatisticsOverview] error: ", error);
      return null;
    }
  }

  return useQuery({
    queryKey: ["statistics-overview", params],
    queryFn: fetchOverview,
  });
}

