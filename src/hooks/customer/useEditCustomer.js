import toast from "react-hot-toast";
import { editCustomerInfoReq } from "../../api/customers";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useEditCustomer(id) {
  const queryClient = useQueryClient();

  async function editCustomer(payload) {
    try {
      const { data } = await editCustomerInfoReq(id, payload);

      if (data?.success) {
        toast.success("ویرایش مشتری با موفقیت انجام شد.");
        queryClient.invalidateQueries([
          "fetch-customer-info",
          "fetch-paginate-customers",
          "fetch-inifinite-customers",
        ]);
        return data.data;
      } else {
        toast.error("ویرایش مشتری با خطا مواجه شد");
        return false;
      }
    } catch (error) {
      toast.error("ویرایش مشتری با خطا مواجه شد");
      console.error("[useEditCustomer] error:", error);
      return false;
    }
  }

  return useMutation({
    mutationKey: ["edit-customer", id],
    mutationFn: editCustomer,
  });
}
