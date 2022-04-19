import pkg from "../package.json";

export const VERSION = pkg.version;

export const GA = "G-ZMQ4PKF7BP";

export const TERMS_VERSION = "0.0.1";

export const isProduct = process.env.APP_ENV === "prod";

export const PANDO_DOC = "https://docs.pando.im/docs/";

export const NODE_ENV = process.env.NODE_ENV;

export const APP_TOKEN = process.env.TOKEN;

export const MIXIN_HOST = "https://api.mixin.one";

export const CONFIG = isProduct
  ? {
      API_BASE: "https://wave-api.pando.im/api",
      MIXIN_CLIENT_ID: "df85ead6-deba-4ba1-9168-e51347b1c7fe",
    }
  : {
      API_BASE: "https://wave-test-api.fox.one/api",
      MIXIN_CLIENT_ID: "2e7d1db4-7795-4203-a0e6-79ad6ce39135",
    };

export const EVENTS = {
  OPEN_AUTH: "OPEN_AUTH",
  PAY_QR_CODE: "PAY_QR_CODE",
  OPEN_TERMS_MODAL: "OPEN_TERMS_MODAL",
};
