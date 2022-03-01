<template>
  <f-asset-amount-input
    v-model="bindAmount"
    :asset.sync="bindAsset"
    :assets="assets"
    inputmode="decimal"
    hide-details
    fullfilled
    v-bind="$attrs"
  >
    <template #tools="{ messages }">
      <f-asset-input-tools
        :wallet-connected="meta.logged"
        :balance="meta.balance"
        :fiat-amount="meta.fiatAmountText"
        :messages="messages"
        :fillable="fillable"
        @fill="handleFill"
        @connect-wallet="handleConnectWallet"
      />
    </template>
  </f-asset-amount-input>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from "vue-property-decorator";
import { GlobalGetters } from "~/store/types";

@Component({
  inheritAttrs: false,
})
class AssetAmountInput extends Vue {
  @Prop() assets;

  @PropSync("asset") bindAsset;

  @PropSync("amount") bindAmount;

  @Prop({ type: Boolean, default: true }) fillable;

  get meta() {
    const toFiat = this.$utils.number.toFiat;
    const getters = this.$store.getters;

    const getBalanceById = getters[GlobalGetters.GET_BALANCE_BY_ID];
    const fiatAmount = +this.bindAmount * +this.bindAsset.price;

    return {
      closed,
      getters,
      logged: getters[GlobalGetters.LOGGED],
      balance: getBalanceById(this.bindAsset.id),
      fiatAmountText: toFiat(this, { n: fiatAmount }),
    };
  }

  handleFill() {
    this.bindAmount = this.meta.balance;
  }

  handleConnectWallet() {
    this.$utils.account.openAuth(this);
  }
}
export default AssetAmountInput;
</script>
