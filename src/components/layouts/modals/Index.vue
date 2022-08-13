<template>
  <div>
    <f-paying-modal :show="paying.visible" :text="text" z-index="1000" @cancel="handlePayingCancel" />

    <auth-modal />

    <pay-qr-code-modal />

    <terms-modal />

    <pando-announce-modal app="wave" :dev="dev" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Sync } from "vuex-pathify";
import AuthModal from "./AuthModal.vue";
import PayQrCodeModal from "./PayQrCodeModal.vue";
import TermsModal from "./TermsModal.vue";
import { isProduct } from "@/constants";

@Component({
  components: {
    AuthModal,
    TermsModal,
    PayQrCodeModal,
  },
})
class Modals extends Vue {
  @Sync("app/paying") paying!: State.PayState;

  dev = !isProduct;

  get text() {
    return this.paying.text || this.$t("checking_result");
  }

  handlePayingCancel() {
    this.paying = { visible: false, timer: null };
  }
}
export default Modals;
</script>
