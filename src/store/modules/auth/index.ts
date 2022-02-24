import { MutationTree, GetterTree } from "vuex";
import { make } from "vuex-pathify";
import { GetterTypes, MutationTypes } from "./types";

const state = (): State.Auth => ({
  token: "",
  scope: "",
  channel: "",
});

const getters: GetterTree<State.Auth, any> = {
  [GetterTypes.LOGGED](state) {
    return Boolean(state.token);
  },
};

const mutations: MutationTree<State.Auth> = {
  ...make.mutations(state),
  [MutationTypes.SET_OAUTH_INFO](state, data) {
    state.token = data.token;
    state.scope = data.scope;
    state.channel = data.channel;
  },
  [MutationTypes.CLEAR_AUTH](state) {
    state.token = "";
    state.scope = "";
    state.channel = "";
  },
};

export default {
  namespaced: true,
  getters,
  state,
  mutations,
};
