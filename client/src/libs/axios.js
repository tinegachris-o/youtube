import axios from "axios";
const BASE_URL =
  import.meta.env.VITE_ENV === "development"
    ? "http://localhost:8080/api/"
    : "/api";
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
