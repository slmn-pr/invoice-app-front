import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInvoiceReq } from "../../api/invoices";
import toast from "react-hot-toast";

export default function useDeleteInvoice() {
  // deleteInvoiceReq;

  const queryClient = useQueryClient();

  async function deleteMutation(id) {
    try {
      const { data } = await deleteInvoiceReq(id);
      if (data?.success) {
        toast.success("حذف فاکتور با موفقیت انجام شد");
      } else {
        toast.error(data.error);
      }
      return data;
    } catch {
      toast.error("خطا: حذف فاکتور با مشکل مواجه شد");
    }
  }

  return useMutation({
    mutationKey: ["Deleteinvoice"],
    mutationFn: deleteMutation,
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchPaginateInvoices"]);
    },
  });
}
