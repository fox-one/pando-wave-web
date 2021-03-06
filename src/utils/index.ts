import * as helper from "./helper";
import * as number from "./number";
import * as account from "./account";
import * as app from "./app";
import * as wallet from "./wallet";
import * as wave from "./wave";
import * as payment from "./payment";
import utils, { mixin } from "@foxone/utils";

export default {
  helper,
  mixin,
  account,
  app,
  wave,
  wallet,
  payment,
  number: { ...utils.number, ...number },
};
