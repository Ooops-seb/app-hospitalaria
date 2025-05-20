import axios from "axios";

const protocol = "http";
const host = process.env.NEXT_PUBLIC_API_DOMAIN || "api.example.com";
const port = 5010;
// const prefix = "api";

const api = axios.create({
  baseURL: new URL(`${protocol}://${host}:${port}/`).toString(),
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
