import { isDarkTheme } from "@foxone/utils/mixin";
import { MutationTypes } from "./types";
import { make } from "vuex-pathify";

const state = (): State.App => ({
  appbar: {
    title: "",
    style: "home",
    show: true,
    back: false,
    extension: null,
    extensionHeight: 48,
  },
  settings: {
    dark: isDarkTheme(),
  },
  paying: {
    visible: false,
    text: "",
    timer: null,
  },
  initing: true,
  termsAccepted: false,
  termsVersion: "0.0.0",
});

const mutations = {
  ...make.mutations(state),
  [MutationTypes.SET_PAYING](state, data) {
    if (data.visible === false && state.paying.timer) {
      clearTimeout(state.paying.timer as any);
    }

    state.paying = { ...state.paying, text: "", ...data };
  },
  [MutationTypes.SET_APPBAR](state, value) {
    const defaultValue = {
      title: "",
      style: "",
      show: true,
      back: true,
      color: "",
    };
    state.appbar = { ...defaultValue, ...value };
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
