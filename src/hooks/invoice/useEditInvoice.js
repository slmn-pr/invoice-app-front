import toast from "react-hot-toast";
import { updateInvoice } from "../../api/invoices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useEditInvoice(id) {
  const queryClient = useQueryClient();

  async function editInvoice(payload) {
    console.log("[useEditInvoice] payload:", payload);
    // return;
    try {
      const { data } = await updateInvoice(id, payload);

      if (data?.success) {
        toast.success("ویرایش فاکتور با موفقیت انجام شد.");
        queryClient.invalidateQueries([
          "fetchPaginateInvoices",
          "fetch-invoice-detail",
        ]);
        return data.data;
      } else {
        toast.error("ویرایش فاکتور با خطا مواجه شد");
        return false;
      }
    } catch (error) {
      toast.error("ویرایش فاکتور با خطا مواجه شد");
      console.error("[useEditInvoice] error:", error);
      return false;
    }
  }

  return useMutation({
    mutationKey: ["edit-invoice", id],
    mutationFn: editInvoice,
  });
}

