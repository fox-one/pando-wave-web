import { Vue } from "vue-property-decorator";
import { APP_TOKEN, CONFIG, NODE_ENV, EVENTS } from "~/constants";
import { GlobalMutations } from "~/store/types";

export async function requestAuthMixin(vm: Vue) {
  if (NODE_ENV === "development" && APP_TOKEN) {
    await updateProfile(vm, { token: APP_TOKEN, channel: "mixin" });

    return;
  }

  const host = window.location.origin;
  const redirectUrl = encodeURIComponent(host + "/#/auth/");
  const path = `https://mixin-oauth.fox.one/?client_id=${CONFIG.MIXIN_CLIENT_ID}&scope=PROFILE:READ+ASSETS:READ&response_type=code&redirect_url=${redirectUrl}`;

  localStorage.setItem("authPath", window.location.href);
  window.location.href = path;
}

export async function authMixin(vm: Vue, code: string) {
  const res = await vm.$apis.auth(code);
  const redirect = localStorage.getItem("authPath") || "/";

  await updateProfile(vm, {
    token: res.token,
    channel: "mixin",
  });
  document.location.replace(redirect);
}

export async function authFennec(vm: Vue) {
  await vm.$fennec.connect("Pando Wave");

  const token = await vm.$fennec.ctx!.wallet.signToken({
    payload: { from: "pando-wave" },
  });

  await updateProfile(vm, { token, channel: "fennec" });
}

export async function checkFennecAuth(vm: Vue) {
  if (vm.$store.state.auth.channel === "fennec") {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        vm.$fennec
          .connect("Pando Wave")
          .then(() => {
            resolve(true);
          })
          .catch(() => {
            reject();
          });
      }, 1000);
    });
  }
}

async function updateProfile(vm: Vue, payload: { token: string; channel: string }) {
  vm.$store.commit(GlobalMutations.SET_OAUTH_INFO, payload);

  await vm.$utils.app.loadAccount(vm);
}

export function logout(vm: Vue) {
  if (vm.$store.state.auth.channel === "fennec") {
    vm.$fennec?.disconnect();
  }

  vm.$store.commit(GlobalMutations.CLEAR_AUTH);
  vm.$store.commit(GlobalMutations.CLEAR_ACCOUNT);
}

export function requestLogout(vm: Vue, cbs: { onDisconnect?: any }) {
  vm.$uikit.dialog.show({
    title: vm.$t("confirm") as string,
    text: vm.$t("disconnect.confirm") as string,
    type: "warning",
    confirm: {
      text: vm.$t("disconnect") as string,
      callback: () => {
        vm.$utils.account.logout(vm);

        cbs?.onDisconnect?.();
      },
    },
  });
}

export function openAuth(vm: Vue) {
  vm.$root.$emit(EVENTS.OPEN_AUTH);
}
