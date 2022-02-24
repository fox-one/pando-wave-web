import { prefix as AppPrefix, MutationTypes as AppMutationTypes } from "./modules/app/types";
import {
  prefix as AuthPrefix,
  GetterTypes as AuthGetterTypes,
  MutationTypes as AuthMutationTypes,
} from "./modules/auth/types";
import {
  prefix as AccountPrefix,
  GetterTypes as AccountGetterTypes,
  MutationTypes as AccountMutationTypes,
  ActionTypes as AccountActionTypes,
} from "./modules/account/types";
import {
  prefix as MarketPrefix,
  GetterTypes as MarketGetterTypes,
  MutationTypes as MarketMutationTypes,
  ActionTypes as MarketActionTypes,
} from "./modules/market/types";

function getGlobalTypes<T>(types: T, prefix: string) {
  return Object.keys(types).reduce(
    (m, k) => ({
      [k]: `${prefix}${types[k]}`,
      ...m,
    }),
    {},
  ) as { [k in keyof T]: string };
}

export const GlobalMutations = {
  ...getGlobalTypes(AppMutationTypes, AppPrefix),
  ...getGlobalTypes(AuthMutationTypes, AuthPrefix),
  ...getGlobalTypes(AccountMutationTypes, AccountPrefix),
  ...getGlobalTypes(MarketMutationTypes, MarketPrefix),
};

export const GlobalActions = {
  ...getGlobalTypes(AuthMutationTypes, AuthPrefix),
  ...getGlobalTypes(AccountActionTypes, AccountPrefix),
  ...getGlobalTypes(MarketActionTypes, MarketPrefix),
};

export const GlobalGetters = {
  ...getGlobalTypes(AuthGetterTypes, AuthPrefix),
  ...getGlobalTypes(AccountGetterTypes, AccountPrefix),
  ...getGlobalTypes(MarketGetterTypes, MarketPrefix),
};
