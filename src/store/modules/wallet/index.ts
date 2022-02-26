import Vue from "vue";
import { make } from "vuex-pathify";
import { GetterTypes, MutationTypes } from "./types";
import { GetterTree, MutationTree } from "vuex";

const state = (): State.Wallet => ({
  assets: [],
});

const getters: GetterTree<State.Wallet, any> = {
  [GetterTypes.GET_WALLET_BALANCE](state) {
    return state.assets.reduce((total, next) => {
      return total + +next.price_usd * +next.balance;
    }, 0);
  },
  [GetterTypes.GET_WALLET_ASSET_BY_ID](_, getters) {
    return (id: string) => getters[GetterTypes.WALLET_ASSETS_MAP][id];
  },
  [GetterTypes.GET_BALANCE_BY_ID](_, getters) {
    return (id: string) => getters[GetterTypes.WALLET_ASSETS_MAP][id]?.balance ?? "0";
  },
  [GetterTypes.GET_PRICE_BY_ID](_, getters) {
    return (id: string) => getters[GetterTypes.WALLET_ASSETS_MAP][id]?.price_usd ?? "0";
  },
  [GetterTypes.WALLET_ASSETS_MAP](state) {
    return state.assets.reduce((m, x) => ({ ...m, [x.asset_id]: x }), {});
  },
};

const mutations: MutationTree<State.Wallet> = {
  ...make.mutations(state),
  [MutationTypes.SET_WALLET_ASSETS](state, assets: API.MixinAsset[]) {
    state.assets = assets;
  },

  [MutationTypes.SET_WALLET_ASSET](state, asset: API.MixinAsset) {
    const index = state.assets.findIndex((a) => a.asset_id === asset.asset_id);
    if (index !== -1) {
      Vue.set(state.assets, index, asset);
    } else {
      state.assets = [...state.assets, asset];
    }
  },

  [MutationTypes.CLEAR_WALLET_ASSETS](state) {
    state.assets = [];
  },
};

export default {
  namespaced: true,
  getters,
  state,
  mutations,
};
