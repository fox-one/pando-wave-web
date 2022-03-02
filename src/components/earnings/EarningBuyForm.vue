<template>
  <v-form ref="form" v-model="valid" class="earning-buy-form">
    <base-asset-amount-input
      :selectable="false"
      :asset="current"
      :amount.sync="bindAmount"
      :assets="assets"
      :rules="rules.amount"
      :placeholder="$t('buy.amount')"
    />

    <earning-buy-action
      :valid="valid"
      :asset="asset"
      :amount="bindAmount"
      :product="product"
      @success="handleSuccess"
    />
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from "vue-property-decorator";
import EarningBuyAction from "./EarningBuyAction.vue";
import BigNumber from "bignumber.js";

@Component({
  components: {
    EarningBuyAction,
  },
})
class EarningBuyForm extends Vue {
  @Prop() asset!: API.Asset;

  @Prop() product!: API.Product;

  @PropSync("amount") bindAmount!: string;

  valid = false;

  get assets() {
    const convertToSelectAsset = this.$utils.helper.convertToSelectAsset;

    return [this.asset].map(convertToSelectAsset);
  }

  get current() {
    return this.assets[0];
  }

  get rules() {
    const format = this.$utils.number.format;
    const { max_amount_per_order, min_amount_per_order, capacity, sold } = this.product;
    const avaliable = new BigNumber(capacity).minus(sold);
    const maxAmountPerOrderText = format({ n: max_amount_per_order, dp: 8 });
    const minAmountPerOrderText = format({ n: min_amount_per_order, dp: 8 });
    const avaliableText = format({ n: avaliable, dp: 8 });

    return {
      amount: [
        (v) => !!v || +v > 0 || this.$t("error.amount-invalid"),
        (v) => v <= +max_amount_per_order || this.$t("error.max_amount_per_order", { amount: maxAmountPerOrderText }),
        (v) => v >= +min_amount_per_order || this.$t("error.min_amount_per_order", { amount: minAmountPerOrderText }),
        (v) => v <= avaliable || this.$t("error.avaliable", { amount: avaliableText }),
      ],
    };
  }

  handleSuccess() {
    const form: any = this.$refs.form;

    form.reset();
  }
}
export default EarningBuyForm;
</script>
