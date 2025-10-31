import axios from "axios";

const API_BASE_URL = "http://localhost:4000";
const TMP_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRjYmU3Zjc5LWZmYTUtNGU2OC05YjBlLThlOWM2NTFkNjBhNCIsImVtYWlsIjoic2FsbWFuQGdtYWlsLmNvbSIsImlhdCI6MTc2MTg5MTM0MiwiZXhwIjoxNzYxODk0OTQyfQ.58OEJSxHHYlZPkyrRh3l65WsCzSuFlPZvXXdaYYvOO4";

const userReq = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Brear ${TMP_ACCESS_TOKEN}`,
  },
});

export default userReq;
