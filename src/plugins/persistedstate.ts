import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  createPersistedState({
    key: "vuex",
    paths: ["auth", "app.termsAccepted", "app.termsVersion"],
  })(store);
};
