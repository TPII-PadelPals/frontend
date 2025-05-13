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
  const { token, onLogout } = useSessionStore();

  const axiosInstance: AxiosInstanceWithInterceptors =
    useMemo((): AxiosInstanceWithInterceptors => {
      const instance: AxiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_GATEWAY_URL,
        headers: {
          Authorization: needAuth ? "Bearer " + token : undefined,
        },
      });

      const responseInterceptor: number = instance.interceptors.response.use(
        (response) => response,
        async (error) => {
          const prevRequest = error.config;

          // 500 error - replace message with custom message
          if (error.response?.status === 500) {
            error.response.data.error.description =
              "Hubo un problema, por favor intente más tarde";
            return Promise.reject(error);
          }

          // Session token problem
          if (error.response?.status === 401 && !prevRequest?.sent) {
            console.error(
              "useAxios.responseInterceptor => Token de sesion invalido"
            );
            prevRequest.sent = true;
            onLogout();
            return Promise.reject(error);
          }

          return Promise.reject(error);
        }
      );

      return { instance, responseInterceptor };
    }, [needAuth, token, onLogout]);

  useEffect((): (() => void) => {
    return (): void => {
      axiosInstance.instance.interceptors.response.eject(
        axiosInstance.responseInterceptor
      );
    };
  }, [axiosInstance]);

  return axiosInstance.instance;
}
