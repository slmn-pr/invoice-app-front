import axios from "axios";
import { getAccessTokenFromCookie, clearAuthCookies } from "../utils/cookies";
import { useAuthStore } from "../store/authStore";

const API_BASE_URL = "http://localhost:4000/api";

const userReq = axios.create({
  baseURL: API_BASE_URL,
});

// Request Interceptor
userReq.interceptors.request.use((req) => {
  const accessToken = getAccessTokenFromCookie();

  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }

  return req;
});

// Response Interceptor
userReq.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("[userReq.interceptors.response.use] error", error);

    if (error.response && error.response.status === 401) {
      // Clear cookies and zustand store
      const { logout } = useAuthStore.getState();
      logout();

      // Redirect to login page
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export default userReq;
