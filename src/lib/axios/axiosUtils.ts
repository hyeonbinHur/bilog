import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // 환경변수 사용
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
