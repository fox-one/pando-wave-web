<template>
  <div>
    <slot v-if="!isLogged" name="action" :on="{ click: handleOpenAuth }">
      <f-button color="primary" @click="handleOpenAuth" v-bind="$attrs">
        {{ $t("connect_wallet") }}
      </f-button>
    </slot>

    <slot v-else></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Get } from "vuex-pathify";
import { GlobalGetters } from "@/store/types";

@Component
export default class ConnectWalletBtn extends Vue {
  @Get(GlobalGetters.LOGGED) isLogged!: boolean;

  handleOpenAuth() {
    this.$utils.account.openAuth(this);
  }
}
</script>

<style></style>
