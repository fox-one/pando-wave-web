import { GlobalActions, GlobalMutations } from "~/store/types";

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
