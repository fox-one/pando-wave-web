<template>
  <v-dialog v-model="dialog" max-width="600">
    <f-panel class="payment">
      <div class="my-3">
        {{ $t("payment") }}
      </div>

      <f-qr-code v-if="url" :text="url" :size="180" class="my-5" />

      <f-button color="primary" @click="handlePaid">
        {{ $t("paid") }}
      </f-button>
    </f-panel>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { EVENTS } from "@/constants";

import type { Callbacks } from "~/utils/payment";

@Component
class PayQrCodeModal extends Vue {
  dialog = false;

  url = "";

  cbs: Callbacks = {};

  checker: any = null;

  mounted() {
    this.$root.$on(EVENTS.PAY_QR_CODE, this.show);
  }

  show(url, checker, cbs) {
    this.url = url;
    this.cbs = cbs;
    this.checker = checker
    this.dialog = true;
  }

  async handlePaid() {
    if (!this.url) return;

    this.dialog = false;

    if (this.checker) {
      this.$utils.payment.showPaying(this);
      this.$utils.payment.pollingResult(this, this.checker, this.cbs);
    }

  }

  @Watch("dialog")
  handleDialogChange(value: boolean) {
    if (!value) {
      this.url = "";
      this.checker = null
      this.cbs = {};
    }
  }
}
export default PayQrCodeModal;
</script>

<style lang="scss" scoped>
.payment {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
