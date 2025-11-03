import axios from "axios";
import { getAccessTokenFromCookie } from "../utils/cookies";

const API_BASE_URL = "http://localhost:4000";

const userReq = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Brear ${getAccessTokenFromCookie()}`,
  },
});

export default userReq;
