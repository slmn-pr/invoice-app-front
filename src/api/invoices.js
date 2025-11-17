import userReq from "./axios-config";
// const tmpPayloadInsert = {
//   customerId: "ee05ff3b-5563-4ed4-ba10-fc307e632385",
//   items: [
//     {
//       description: "string",
//       quantity: 1,
//       price: 10,
//     },
//   ],
//   total: 10,
// };

export const getAllInvoices = () => {
  return userReq.get("/invoices?page=1&limit=10");
};

export const insertInvoice = (invoice = {}) => {
  return userReq.post("/invoices", invoice);
};

export const deleteInvoiceReq = (invoiceID) => {
  return userReq.delete(`/invoices/${invoiceID}`);
};

export const getInvoiceDetailReq = (id) => {
  return userReq.get(`/invoices/${id}`);
};

export const updateInvoice = (invoiceID, invoice = {}) => {
  return userReq.put(`/invoices/${invoiceID}`, invoice);
};
