<template>
  <f-auth-method-modal
    ref="authModal"
    :fennec="fennec"
    :client-id="clientId"
    :scope="scope"
    :is-firesbox="false"
    @auth="handleLogin"
    @error="handleError"
  />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { EVENTS, CONFIG } from "@/constants";

@Component
class AuthModal extends Vue {
  fennec = false;

  clientId = CONFIG.MIXIN_CLIENT_ID;

  scope = "PROFILE:READ ASSETS:READ";

  mounted() {
    setTimeout(() => {
      this.fennec = this.$fennec?.isAvailable() ?? false;
    }, 200);

    this.$root.$on(EVENTS.OPEN_AUTH, () => {
      const authModal = this.$refs.authModal as any;

      authModal?.onClick();
    });
  }

  handleLogin(value) {
    if (value.type === "mixin") {
      this.$utils.account.requestAuthMixin(this);
    } else {
      this.$utils.account.authFennec(this);
    }
  }

  handleError(err) {
    console.log(err);
  }
}
export default AuthModal;
</script>
