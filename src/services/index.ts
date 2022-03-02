/* eslint-disable prefer-promise-reject-errors */
import { NuxtAppOptions } from "@nuxt/types";
import { AxiosRequestConfig } from "axios";
import Http from "@foxone/utils/http";
import { AxiosResponse } from "axios";
import createApis from "./apis";

function generateStructureInterceptor(app) {
  return [
    (res: AxiosResponse) => {
      if (res?.data?.data?.code === 401) {
        app.$utils.account.logout({ $store: app.store } as Vue);

        return Promise.reject(res.data.data);
      }

      return Promise.resolve(res.data.data);
    },
    (error: any) => {
      console.log(error);
      if (error.response && error.response.data) {
        const status = error.response.status;

        if (status === 401) {
          app.$utils.account.logout({ $store: app.store } as Vue);
        }

        return Promise.reject({ status, ...error.response.data });
      } else {
        return Promise.reject({ status, code: -1 });
      }
    },
  ];
}

function generateAuthInterceptor(app: NuxtAppOptions) {
  return [
    (configs: AxiosRequestConfig): AxiosRequestConfig => {
      const token = app.store?.state.auth.token;

      if (token) {
        configs.headers.Authorization = `Bearer ${token}`;
      }

      return configs;
    },
  ] as any;
}

export default function createHttpService(app: NuxtAppOptions, base: string) {
  const config: AxiosRequestConfig = { baseURL: base };
  const http = new Http(config, [generateAuthInterceptor(app)], [generateStructureInterceptor(app)]);

  return createApis(http);
}
