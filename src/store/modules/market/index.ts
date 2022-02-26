import { MutationTree, GetterTree, ActionTree } from "vuex";
import { make } from "vuex-pathify";
import { GetterTypes, MutationTypes, ActionTypes } from "./types";

const state = (): State.Market => ({
  products: [],
  fiats: [],
  assets: [],
});

const getters: GetterTree<State.Market, any> = {
  [GetterTypes.GET_PRODUCT_BY_ID](state) {
    return (id: string) => state.products.find((x) => x.id === +id);
  },
  [GetterTypes.GET_ASSET_BY_ID](state) {
    return (id: string) => state.assets.find((x) => x.asset_id === id);
  },
};

const mutations: MutationTree<State.Market> = {
  ...make.mutations(state),
};

const actions: ActionTree<State.Market, any> = {
  async [ActionTypes.LOAD_ASSETS]({ commit }) {
    const assets = await this.$apis.getAssets();

    commit(MutationTypes.SET_ASSETS, assets);
  },

  async [ActionTypes.LOAD_FIATS]({ commit }) {
    const fiats = await this.$apis.getFiats();

    commit(MutationTypes.SET_FIATS, fiats);
  },

  async [ActionTypes.LOAD_PRODUCTS]({ commit }) {
    const products = await this.$apis.getEarningProducts();

    commit(MutationTypes.SET_PRODUCTS, products);
  },
};

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions,
};
