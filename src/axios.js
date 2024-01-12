import axios from "axios";

export const API_URL = "http://13.58.244.180/";

const instance = axios.create({
  baseURL: API_URL,
});

const token = localStorage.getItem("token");

token &&
  instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

export default instance;
