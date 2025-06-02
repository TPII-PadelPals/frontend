import axios, { AxiosInstance } from "axios";
import { useEffect, useMemo } from "react";

import { useSessionStore } from "@/store/sessionStore";

interface AxiosInstanceWithInterceptors {
  instance: AxiosInstance;
  requestInterceptor?: number;
  responseInterceptor: number;
}

export default function useAxios(
  { needAuth = true }: { needAuth?: boolean } = { needAuth: true }
): AxiosInstance {
  const { onLogout } = useSessionStore();

  const axiosInstance: AxiosInstanceWithInterceptors =
    useMemo((): AxiosInstanceWithInterceptors => {
      const instance: AxiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_GATEWAY_URL,
      });

      const requestInterceptor = instance.interceptors.request.use((config) => {
        if (needAuth) {
          const currentToken = useSessionStore.getState().token;
          if (config.headers) {
            config.headers.set(
              "Authorization",
              currentToken ? `Bearer ${currentToken}` : undefined
            );
          }
        }
        return config;
      });

      const responseInterceptor: number = instance.interceptors.response.use(
        (response) => response,
        async (error) => {
          const prevRequest = error.config;

          // 500 error - replace message with custom message
          if (error.response?.status === 500) {
            error.response.data.detail =
              "Hubo un problema, por favor intente más tarde";
            return Promise.reject(error);
          }

          // Session token problem
          if (error.response?.status === 401 && !prevRequest?.sent) {
            console.error(
              "useAxios.responseInterceptor => Token de sesion invalido"
            );
            error.response.data.detail =
              "Se ha cerrado la sesión, por favor inicie sesión nuevamente";
            prevRequest.sent = true;
            onLogout();
            return Promise.reject(error);
          }

          return Promise.reject(error);
        }
      );

      return { instance, requestInterceptor, responseInterceptor };
    }, [needAuth, onLogout]);

  useEffect((): (() => void) => {
    return (): void => {
      axiosInstance.instance.interceptors.response.eject(
        axiosInstance.responseInterceptor
      );
    };
  }, [axiosInstance]);

  return axiosInstance.instance;
}
