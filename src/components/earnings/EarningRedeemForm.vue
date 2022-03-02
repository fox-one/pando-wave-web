<template>
  <v-form v-model="valid" class="earning-redeem-form">
    <f-asset-amount-input
      v-model="bindAmount"
      :asset.sync="current"
      :assets="assets"
      :selectable="false"
      :rules="rules.amount"
      inputmode="decimal"
      hide-details
      fullfilled
      placeholder="Redeem Amount"
    >
      <template #tools="{ messages }">
        <f-asset-input-tools :messages="messages" :fiat-amount="meta.fiatAmountText">
          <template #left>
            <div class="greyscale_3--text d-flex align-center">
              <span class="mr-1"> Position: </span>
              <span @click.stop="handleFill">
                {{ meta.positionText }}
              </span>
              <v-icon size="12" class="ml-1" @click.stop="handleFill">
                $fill
              </v-icon>
            </div>
          </template>
        </f-asset-input-tools>
      </template>
    </f-asset-amount-input>

    <earning-redeem-action :valid="valid" :amount="bindAmount" :asset="asset" :product="product" />
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from "vue-property-decorator";
import BigNumber from "bignumber.js";
import EarningRedeemAction from "./EarningRedeemAction.vue";

@Component({
  components: {
    EarningRedeemAction,
  },
})
class EarningRedeemForm extends Vue {
  @Prop() asset!: API.Asset;

  @Prop() product!: API.Product;

  @Prop() hold!: API.MyProduct;

  @PropSync("amount") bindAmount!: string;

  valid = false;

  get meta() {
    const getPosition = this.$utils.wave.getPosition;
    const format = this.$utils.number.format;
    const toFiat = this.$utils.number.toFiat;

    const { product, asset, hold } = this;
    const { price_usd } = asset;
    const { borrow_rate } = product;
    const { normalized_amount } = hold;

    const position = getPosition(normalized_amount, borrow_rate);
    const fiatAmount = +this.bindAmount * +price_usd;

    return {
      position,
      fiatAmountText: toFiat(this, { n: fiatAmount }),
      positionText: format({ n: position, dp: 8, mode: BigNumber.ROUND_DOWN }),
    };
  }

  get assets() {
    const convertToSelectAsset = this.$utils.helper.convertToSelectAsset;

    return [this.asset].map(convertToSelectAsset);
  }

  get current() {
    return this.assets[0];
  }

  get rules() {
    return {
      amount: [
        (v) => (!!v && +v > 0) || "Amount is invalid",
        (v) => +v <= +this.meta.position || "Amount cannot exceed position",
      ],
    };
  }

  handleFill() {
    this.bindAmount = this.meta.position + "";
  }
}
export default EarningRedeemForm;
</script>
