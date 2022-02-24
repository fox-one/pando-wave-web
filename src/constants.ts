import pkg from "../package.json";

export const VERSION = pkg.version;

export const isProduct = process.env.APP_ENV === "prod";

export const PANDO_DOC = "https://docs.pando.im/docs/rings/intro";

export const NODE_ENV = process.env.NODE_ENV;

export const APP_TOKEN = process.env.TOKEN;

export const CONFIG = isProduct
  ? {
      API_BASE: "https://dash-api.getlinks.jp/api",
      MIXIN_CLIENT_ID: "39d0a82d-2445-4abf-b273-7920af251174",
    }
  : {
      API_BASE: "https://dash-api.chrove.com/api",
      MIXIN_CLIENT_ID: "2ba745d7-3e3e-4b46-8c4c-56ca3282081d",
    };

export const EVENTS = {
  OPEN_AUTH: "OPEN_AUTH",
  PAY_QR_CODE: "PAY_QR_CODE",
};
