import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCusomerReq } from "../../api/customers";

export default function useDeleteCustomer() {
  const queryClient = useQueryClient();
  async function deleteCustomer(id) {
    if (!id) {
      toast.error("مشتری نامعتبر");
      return false;
    }
    try {
      const { data } = await deleteCusomerReq(id);

      if (data?.success) {
        toast.success("حذف کابر با موفقیت انجام شد");
        queryClient.invalidateQueries([
          "fetch-paginate-customers",
          "fetch-inifinite-customers",
        ]);

        return data.data;
      } else {
        toast.error("خطا: حذف مشتری با مشکل مواجه شد");
        return false;
      }
    } catch (error) {
      toast.error("خطا: حذف مشتری با مشکل مواجه شد");
      console.error("[useDeleteCustomer] catch: ", error);

      return false;
    }
  }
  return useMutation({
    mutationKey: ["delete-customer"],
    mutationFn: deleteCustomer,
  });
}
