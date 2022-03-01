<template>
  <div class="earning-buy-form">
    <base-asset-amount-input
      :selectable="false"
      :asset="current"
      :amount.sync="bindAmount"
      :assets="assets"
      placeholder="Buy Amount"
    />

    <earning-buy-action :asset="asset" :amount="bindAmount" :product="product" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from "vue-property-decorator";
import EarningBuyAction from "./EarningBuyAction.vue";

@Component({
  components: {
    EarningBuyAction,
  },
})
class EarningBuyForm extends Vue {
  @Prop() asset!: API.Asset;

  @Prop() product!: API.Product;

  @PropSync("amount") bindAmount!: string;

  get assets() {
    const convertToSelectAsset = this.$utils.helper.convertToSelectAsset;

    return [this.asset].map(convertToSelectAsset);
  }

  get current() {
    return this.assets[0];
  }
}
export default EarningBuyForm;
</script>
