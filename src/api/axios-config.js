import axios from "axios";
import { getAccessTokenFromCookie } from "../utils/cookies";

const API_BASE_URL = "http://localhost:4000/api";

const userReq = axios.create({
  baseURL: API_BASE_URL,
});

userReq.interceptors.request.use((req) => {
  let accessToken = getAccessTokenFromCookie();

  req.headers.Authorization = `Brear ${accessToken}`;

  return req;
  // console.log("userReq is used", args);
});

userReq.interceptors.response.use((response) => {
  console.log("[userReq.interceptors.response.use] response", response);

  if (response.status === 401) {
    window.location.replace("/login");
  }

  return response;
});

export default userReq;
