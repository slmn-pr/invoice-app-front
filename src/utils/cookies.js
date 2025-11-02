import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });

export const saveAuthToken = (token) =>
  cookies.set("access_token", token, {
    secure: true,
    maxAge: 1 * 24 * 60 * 60, // A day in seconds
  });

export const clearAuthCookies = () => cookies.remove("access_token");

export default cookies;
