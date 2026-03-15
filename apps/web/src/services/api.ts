import axios, { AxiosError, type AxiosRequestConfig } from "axios";

 const api = axios.create({
  baseURL: process.env.NEXT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
})

type FailedRequest = {
  resolve: () => void;
  reject: (error: AxiosError) => void;
 }
 
let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });

  failedQueue = [];
};


api.interceptors.response.use(
  (response) => response,
  async (error:AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: () => resolve(api(originalRequest)),
          reject,
        })
      })
    }

    isRefreshing = true;

    try {
      await axios.post(
        `${process.env.NEXT_APP_API_URL}/auth/refresh`,
        {},
        { withCredentials: true },
      );
      
      processQueue(null)
      return api(originalRequest);
    } catch (err) {
      processQueue(err as AxiosError);
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }

  }
)

export default api;