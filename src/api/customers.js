import userReq from "./axios-config";

export const fetchCusomersReq = (params = { page: 1, limit: 10 }) => {
  return userReq.get("/customers", { params });
};
