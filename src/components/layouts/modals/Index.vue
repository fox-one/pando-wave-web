<template>
  <div>
    <f-paying-modal
      :show="paying.visible"
      :text="$t('common.checking-payment')"
      z-index="1000"
      @cancel="handlePayingCancel"
    />

    <auth-modal />

    <pay-qr-code-modal />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Sync } from "vuex-pathify";
import AuthModal from "./AuthModal.vue";
import PayQrCodeModal from "./PayQrCodeModal.vue";

@Component({
  components: {
    AuthModal,
    PayQrCodeModal,
  },
})
class Modals extends Vue {
  @Sync("app/paying") paying!: State.PayState;

  @Prop() a;

  handlePayingCancel() {
    this.paying = { visible: false, timer: null };
  }
}
export default Modals;
</script>
