/* eslint-disable prefer-promise-reject-errors */
import { NuxtAppOptions } from "@nuxt/types";
import { AxiosRequestConfig } from "axios";
import Http from "@foxone/utils/http";
import { AxiosResponse } from "axios";
import createApis from "./apis";

function generateStructureInterceptor() {
  return [
    (res: AxiosResponse) => {
      if (res?.data?.error?.code === 401) {
        // TODO: logout
        // app.$utils.account.logout({ $store: app.store } as Vue);

        return Promise.reject(res.data.error);
      }

      return Promise.resolve(res.data);
    },
    (error: any) => {
      console.log(error);
      if (error.response && error.response.data) {
        const status = error.response.status;

        if (status === 401) {
          // TODO: logout
          // app.$utils.account.logout({ $store: app.store } as Vue);
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
  const http = new Http(config, [generateAuthInterceptor(app)], [generateStructureInterceptor()]);

  return createApis(http);
}
