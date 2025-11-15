import userReq from "./axios-config";

export const fetchCusomersReq = (params = { page: 1, limit: 10 }) => {
  return userReq.get("/customers", { params });
};

export const insertCusomerReq = (payload) => {
  return userReq.post("/customers", payload);
};

export const deleteCusomerReq = (id) => {
  return userReq.delete(`/customers/${id}`);
};

export const getCustomerInfoReq = (id) => {
  return userReq.get(`/customers/${id}`);
};

export const editCustomerInfoReq = (id, payload) => {
  return userReq.put(`/customers/${id}`, payload);
};
