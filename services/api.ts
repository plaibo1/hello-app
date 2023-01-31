import axios, { AxiosInstance } from "axios";
import { refreshToken } from "./user.service";

let api: AxiosInstance;

function getInstance() {
  if (!api) {
    api = axios.create();
    api.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalConfig = error.config;
        if (error.response) {
          if (
            error.response.status === 401 &&
            !originalConfig._retry &&
            originalConfig._retry !== undefined
          ) {
            originalConfig._retry = true;
            try {
              await refreshToken();
              return api(originalConfig);
            } catch (_error: any) {
              document.cookie = `access_token=; path=/;`;
              document.cookie = `refresh_token=; path=/;`;
              return Promise.reject(_error);
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }

  return api;
}

export const apiClient = getInstance();
