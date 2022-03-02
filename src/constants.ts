import pkg from "../package.json";

export const VERSION = pkg.version;

export const isProduct = process.env.APP_ENV === "prod";

export const PANDO_DOC = "https://docs.pando.im/docs/";

export const NODE_ENV = process.env.NODE_ENV;

export const APP_TOKEN = process.env.TOKEN;

export const MIXIN_HOST = "https://api.mixin.one";

export const CONFIG = isProduct
  ? {
      API_BASE: "",
      MIXIN_CLIENT_ID: "",
    }
  : {
      API_BASE: "https://wave-test-api.fox.one/api",
      MIXIN_CLIENT_ID: "2e7d1db4-7795-4203-a0e6-79ad6ce39135",
    };

export const EVENTS = {
  OPEN_AUTH: "OPEN_AUTH",
  PAY_QR_CODE: "PAY_QR_CODE",
};
