import { GlobalActions, GlobalMutations } from "~/store/types";
import { TERMS_VERSION, EVENTS } from "@/constants";

export async function init(vm: Vue) {
  try {
    vm.$store.commit(GlobalMutations.SET_INITING, true);
    await loadMarket(vm);

    if (vm.$route.name === "auth") {
      vm.$store.commit(GlobalMutations.SET_INITING, false);

      return;
    }

    await vm.$utils.account.checkFennecAuth(vm);
    await loadAccount(vm);

    vm.$store.commit(GlobalMutations.SET_INITING, false);
  } catch (error) {
    vm.$utils.helper.errorHandler(vm, error);
  }
}

export async function loadAccount(vm: Vue) {
  try {
    await Promise.all([
      vm.$utils.wallet.getAssets(vm),
      vm.$store.dispatch(GlobalActions.LOAD_PROFILE),
      vm.$store.dispatch(GlobalActions.LOAD_MINE_PRODUCTS),
    ]);
  } catch (error) {}
}

export async function loadMarket(vm: Vue) {
  await Promise.all([
    vm.$store.dispatch(GlobalActions.LOAD_ASSETS),
    vm.$store.dispatch(GlobalActions.LOAD_FIATS),
    vm.$store.dispatch(GlobalActions.LOAD_PRODUCTS),
  ]);
}

export async function refresh(vm: Vue) {
  return Promise.all([loadAccount(vm), loadMarket(vm)]);
}

export function checkTerms(vm: Vue) {
  const termsAccepted = vm.$store.state.app.termsAccepted;
  const termsVersion = vm.$store.state.app.termsVersion;

  if (!termsAccepted || termsVersion !== TERMS_VERSION) {
    vm.$root.$emit(EVENTS.OPEN_TERMS_MODAL);
  }
}
