import * as helper from "./helper";
import * as number from "./number";
import * as account from "./account";
import * as app from "./app";
import utils, { mixin } from "@foxone/utils";

export default {
  helper,
  mixin,
  account,
  app,
  number: { ...utils.number, ...number },
};
