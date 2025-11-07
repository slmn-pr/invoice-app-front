import { useMutation } from "@tanstack/react-query";
import { insertInvoice } from "../../api/invoices";

export default function useInsertInvoice() {
  const onInsertInvoice = async (invoice) => {
    console.log("[AddInvoiceModal] insertInvoice", invoice);

    try {
      const { data, status } = await insertInvoice(invoice);

      console.log("[useInsertInvoice] status", status);
      console.log("[useInsertInvoice] response", data);

      //   if (status === 201) {
      //     return data;
      //   }

      if (data) return data;
    } catch {
      throw new Error("مشکلی در ثبت فاکتور به وجود آمد");
    }
  };

  return useMutation({
    mutationKey: ["insertInvoice"],
    mutationFn: onInsertInvoice,
  });
}
