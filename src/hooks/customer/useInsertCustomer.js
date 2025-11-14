import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertCusomerReq } from "../../api/customers";
import toast from "react-hot-toast";

export default function useInsertCustomer() {
  const queryClient = useQueryClient();
  async function insertCustomer(values) {
    // TODO: validate firts
    // ..
    try {
      const { data } = await insertCusomerReq(values);

      if (data?.success) {
        toast.success("مشتری با موفقیت اضافه شد");
        queryClient.invalidateQueries([
          "fetch-paginate-customers",
          "fetch-inifinite-customers",
        ]);
        return data.data;
      } else {
        toast.error("خطا: مشتری اضافه نشد");
        return false;
      }
    } catch {
      toast.error("خطا: مشتری اضافه نشد");
      return false;
    }
  }
  return useMutation({
    mutationKey: ["insert-customer"],
    mutationFn: insertCustomer,
  });
}
