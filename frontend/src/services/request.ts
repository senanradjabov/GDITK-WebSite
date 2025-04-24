import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_DOMAIN,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        "Ошибка ответа:",
        error.response.status,
        error.response.data
      );
    } else {
      console.error("Ошибка запроса:", error.message);
    }
    return Promise.reject(new Error(error.message));
  }
);

export default api;
