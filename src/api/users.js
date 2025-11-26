import userReq from "./axios-config";

export const fetchUsersReq = (params = { page: 1, limit: 10 }) => {
  return userReq.get("/users", { params });
};

export const fetchUserDetailsReq = (id) => {
  return userReq.get(`/users/${id}`);
};

export const banUserReq = (id, payload = {}) => {
  return userReq.post(`/users/${id}/ban`, payload);
};

export const unbanUserReq = (id) => {
  return userReq.post(`/users/${id}/unban`);
};

export const promoteUserReq = (id, payload) => {
  return userReq.post(`/users/${id}/promote`, payload);
};

export const demoteUserReq = (id) => {
  return userReq.post(`/users/${id}/demote`);
};

