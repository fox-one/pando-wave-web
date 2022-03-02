<template>
  <base-bottom-action-sheet>
    <div class="earning-actions">
      <f-button :disabled="!valid" :loading="loading" color="primary" @click="handleConfirm">
        Confirm
      </f-button>
    </div>
  </base-bottom-action-sheet>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
class EarningRedeemAction extends Vue {
  @Prop() amount!: string;

  @Prop() asset!: API.Asset;

  @Prop() product!: API.Product;

  @Prop() valid!: boolean;

  loading = false;

  handleConfirm() {
    const h = this.$createElement;
    const amountText = `${this.amount} ${this.asset.symbol}`;

    this.$uikit.dialog.show({
      title: h("div", [h(""), h("span", "Confirm Redeem?")]),
      text: `Your will redeem ${amountText}`,
      cancel: { show: true },
      confirm: {
        callback: () => this.requestRedeem(),
      },
    });
  }

  async requestRedeem() {
    this.loading = true;

    try {
      await this.$utils.payment.redeem(
        this,
        { product_id: this.product.id, amount: this.amount },
        { success: () => this.handleSuccess() },
      );
    } catch (error) {
      this.$utils.helper.errorHandler(this, error);
    }

    this.loading = false;
  }

  handleSuccess() {
    const h = this.$createElement;

    this.$uikit.dialog.show({
      title: h("div", [h(""), h("span", "Redeem Successfully")]),
      text: "Your request will be processed. Please return to see the balance",
      cancel: { show: false },
      confirm: { props: { text: false, color: "primary" } },
      props: { contentClass: "f-dialog__custom" },
    });
  }
}
export default EarningRedeemAction;
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
