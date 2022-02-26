import { GlobalGetters, GlobalMutations } from "~/store/types";

export async function getAssets(vm: Vue) {
  let assets: API.MixinAsset[] = [];

  if (vm.$fennec.connected) {
    assets = (await vm.$fennec.ctx?.wallet.getAssets()) ?? [];
  } else {
    const resp = await vm.$apis.getAssetsFromMixin();

    assets = resp;
  }

  if (vm.$store.getters[GlobalGetters.LOGGED]) {
    vm.$store.commit(GlobalMutations.SET_WALLET_ASSETS, assets);
  }
}

export async function getAsset(vm: Vue, id: string) {
  let asset: API.MixinAsset;

  if (vm.$fennec.connected) {
    asset = (await vm.$fennec.ctx?.wallet.getAsset(id)) ?? [];
  } else {
    const resp = await vm.$apis.getAssetFromMixin(id);

    asset = resp;
  }

  if (asset && vm.$store.getters[GlobalGetters.LOGGED]) {
    vm.$store.commit(GlobalMutations.SET_WALLET_ASSET, asset);
  }
}
