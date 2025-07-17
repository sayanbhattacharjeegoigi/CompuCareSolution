import axios, { AxiosInstance } from "axios";
import { ApiKey } from "../constants/GlobalKey";

const http: AxiosInstance = axios.create({
  baseURL: "", // you can optionally set a global base URL
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-api-key": ApiKey,
  },
  timeout: 10000, // optional timeout
});

// Add interceptors if needed (e.g. logging, auth)
http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export default http;
