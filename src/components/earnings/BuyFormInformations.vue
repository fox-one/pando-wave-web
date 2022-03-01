<template>
  <div class="buy-form-informations">
    <base-information-item-list :informations="informations" class="mt-3" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class BuyFormInformations extends Vue {
  @Prop() product!: API.Product;

  @Prop() asset!: API.Asset;

  @Prop() amount;

  get informations() {
    const format = this.$utils.number.format;
    const getAror = this.$utils.wave.getAror;
    const toPercent = this.$utils.number.toPercent;

    const { product, asset, amount } = this;
    const { symbol } = asset;
    const { capacity, sold, min_amount_per_order, max_amount_per_order } = product;

    const aror = getAror(this.product.period, this.product.interest_rate);
    const dailyYield = (+amount * aror) / 365;
    const available = +capacity - +sold;

    return [
      {
        label: "AROR",
        value: toPercent({ n: aror }),
      },
      {
        label: "Daily Yield",
        value: format({ n: dailyYield }) + " " + symbol,
      },
      {
        label: "Available",
        value: format({ n: available }) + " " + symbol,
      },
      {
        label: "Max Amount Per Order",
        value: format({ n: max_amount_per_order }) + " " + symbol,
      },
      {
        label: "Min Amount Per Order",
        value: format({ n: min_amount_per_order }) + " " + symbol,
      },
    ];
  }
}
export default BuyFormInformations;
</script>
