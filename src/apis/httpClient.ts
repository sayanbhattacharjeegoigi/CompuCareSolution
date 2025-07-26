import axios, { AxiosInstance } from "axios";

// httpClient.ts
const http: AxiosInstance = axios.create({
  baseURL: "https://techb.igiapp.com/compucaresolutions/api", // ✅ set base URL once
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Add interceptors if needed (e.g. logging, auth)
http.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong with API";
    return Promise.reject({ message });
  }
);
export default http;
