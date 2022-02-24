import { MutationTree, GetterTree, ActionTree } from "vuex";
import { make } from "vuex-pathify";
import { MutationTypes, ActionTypes } from "./types";

const state = (): State.Account => ({
  profile: null,
  products: [],
});

const getters: GetterTree<State.Account, any> = {};

const mutations: MutationTree<State.Account> = {
  ...make.mutations(state),
  [MutationTypes.SET_MINE_PRODUCTS](state, data) {
    state.products = data;
  },
};

const actions: ActionTree<State.Account, any> = {
  async [ActionTypes.LOAD_PROFILE]({ commit }) {
    const profile = await this.$apis.me();

    commit(MutationTypes.SET_PROFILE, profile);
  },

  async [ActionTypes.LOAD_MINE_PRODUCTS]({ commit }) {
    const products = await this.$apis.getMyEarningProducts();

    commit(MutationTypes.SET_MINE_PRODUCTS, products);
  },
};

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions,
};
