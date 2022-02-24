<template>
  <div>
    <f-paying-modal
      :show="paying.visible"
      :text="$t('common.checking-payment')"
      z-index="1000"
      @cancel="handlePayingCancel"
    />

    <auth-modal />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Sync } from "vuex-pathify";
import AuthModal from "./AuthModal.vue";

@Component({
  components: {
    AuthModal,
  },
})
class Modals extends Vue {
  @Sync("app/paying") paying!: State.PayState;

  handlePayingCancel() {
    this.paying = { visible: false, timer: null };
  }
}
export default Modals;
</script>
