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
    const getAvaliable = this.$utils.wave.getAvaliable;

    const { product, asset, amount } = this;
    const { symbol } = asset;
    const {
      capacity,
      min_amount_per_order,
      max_amount_per_order,
      borrow_rate,
      normalized_amount,
      interest_rate,
      period,
    } = product;

    const aror = getAror(this.product.period, this.product.interest_rate);
    const dailyYield = ((1 + +interest_rate) ^ ((24 * 60 * 60) / period - 1)) * amount;
    const available = getAvaliable(capacity, normalized_amount, borrow_rate);

    return [
      {
        label: this.$t("aror"),
        value: toPercent({ n: aror }),
      },
      {
        label: this.$t("daily_yield"),
        value: "≈ " + format({ n: dailyYield }) + " " + symbol,
      },
      {
        label: this.$t("available"),
        value: format({ n: available, dp: 8 }) + " " + symbol,
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
