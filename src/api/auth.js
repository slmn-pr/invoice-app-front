import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

const authReqConfig = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

export const loginReq = (payload) => {
  return authReqConfig.post("/api/auth/login", payload);
};

export const signupReq = (payload) => {
  return authReqConfig.post("/api/auth/signup", payload);
};
