/* eslint-disable @typescript-eslint/no-unused-vars */
import { Plugin } from "@nuxt/types";
import utils from "@/utils";
import createHttpService from "@/services";
import { CONFIG } from "@/constants";

import Fennec from "@foxone/fennec-dapp";
declare module "vue/types/vue" {
  interface Vue {
    $utils: typeof utils;
    $fennec: Fennec;
    $apis: ReturnType<typeof createHttpService>;
  }
}

declare module "@nuxt/types" {
  interface NuxtAppOptions {
    $utils: typeof utils;
    $fennec: Fennec;
    $apis: ReturnType<typeof createHttpService>;
  }
}

declare module "vuex/types/index" {
  interface Store<S> {
    $utils: typeof utils;
    $fennec: Fennec;
    $apis: ReturnType<typeof createHttpService>;
  }
}

const plugin: Plugin = ({ app }, inject) => {
  inject("utils", utils);
  inject("fennec", new Fennec());
  inject("apis", createHttpService(app, CONFIG.API_BASE));
};

export default plugin;
