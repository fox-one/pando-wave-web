<template>
  <base-bottom-action-sheet>
    <div class="earning-actions">
      <f-button v-if="hold" color="greyscale_6" @click="handleRedeem" class="mr-4">
        {{ $t("redeem") }}
      </f-button>
      <f-button color="primary" @click="handleBuy">
        {{ $t("buy") }}
      </f-button>
    </div>
  </base-bottom-action-sheet>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class EarningActions extends Vue {
  @Prop() product!: API.Product;

  @Prop() hold!: API.MyProduct;

  handleBuy() {
    this.$router.push({ name: "earnings-id-buy", params: { id: this.product.id + "" } });
  }

  handleRedeem() {
    this.$router.push({ name: "earnings-id-redeem", params: { id: this.product.id + "" } });
  }
}
export default EarningActions;
</script>

<style lang="scss" scoped>
.earning-actions {
  display: flex;
  justify-content: space-evenly;
  padding: 16px;

  .f-btn {
    flex: 1;
  }
}
</style>
