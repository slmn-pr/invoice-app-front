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
  return userReq.get("/api/invoices?page=1&limit=10");
};
