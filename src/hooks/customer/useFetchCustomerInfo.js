import { useQuery } from "@tanstack/react-query";
import { getCustomerInfoReq } from "../../api/customers";
import toast from "react-hot-toast";

export default function useFetchCustomerInfo(enabled = false, id) {
  async function fetchCustomerInfo() {
    try {
      const { data } = await getCustomerInfoReq(id);
      if (data?.success) {
        return data.data;
      } else {
        toast.error("بارگیری اطلاعات مشتری با خطا مواجه شد!");
        return false;
      }
    } catch {
      toast.error("بارگیری اطلاعات مشتری با خطا مواجه شد!");
      return false;
    }
  }

  return useQuery({
    enabled: enabled && !!id,
    queryKey: ["fetch-customer-info"],
    queryFn: fetchCustomerInfo,
  });
}
