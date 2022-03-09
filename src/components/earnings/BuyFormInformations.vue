<template>
  <div class="buy-form-informations">
    <base-information-item-list :informations="informations" class="mt-3" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import BigNumber from "bignumber.js";

@Component
class BuyFormInformations extends Vue {
  @Prop() product!: API.Product;

  @Prop() asset!: API.Asset;

  @Prop() amount;

  get informations() {
    const format = this.$utils.number.format;
    const getAror = this.$utils.wave.getAror;
    const toPercent = this.$utils.number.toPercent;
    const getCurrentSold = this.$utils.wave.getCurrentSold;

    const { product, asset, amount } = this;
    const { symbol } = asset;
    const { capacity, sold, min_amount_per_order, max_amount_per_order, redeemed } = product;

    const aror = getAror(this.product.period, this.product.interest_rate);
    const dailyYield = (+amount * aror) / 365;
    const available = new BigNumber(capacity).minus(getCurrentSold(sold, redeemed));

    return [
      {
        label: this.$t("aror"),
        value: toPercent({ n: aror }),
      },
      {
        label: this.$t("daily_yield"),
        value: format({ n: dailyYield }) + " " + symbol,
      },
      {
        label: this.$t("available"),
        value: format({ n: available }) + " " + symbol,
      },
      {
        label: this.$t("max_amount_per_order"),
        value: format({ n: max_amount_per_order }) + " " + symbol,
      },
      {
        label: this.$t("min_amount_per_order"),
        value: format({ n: min_amount_per_order }) + " " + symbol,
      },
    ];
  }
}
export default BuyFormInformations;
</script>
