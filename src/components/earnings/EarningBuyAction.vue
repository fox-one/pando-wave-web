<template>
  <base-bottom-action-sheet>
    <div class="earning-actions">
      <f-button color="primary" @click="handleConfirm">
        Confirm
      </f-button>
    </div>
  </base-bottom-action-sheet>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class EarningBuyAction extends Vue {
  @Prop() amount!: string;

  @Prop() asset!: API.Asset;

  @Prop() product!: API.Product;

  handleConfirm() {
    this.$utils.payment.buy(
      this,
      {
        client_id: this.product.account_id,
        asset_id: this.product.asset_id,
        amount: this.amount,
        product_id: "" + this.product.id,
      },
      {
        success: () => this.handleSuccess(),
      },
    );
  }

  handleSuccess() {
    const h = this.$createElement;

    this.$uikit.dialog.show({
      title: h("div", [h(""), h("span", "Buy Successfully")]),
      text: "Your request will be processed. Please return to see the balance",
      cancel: { show: false },
      confirm: { props: { text: false, color: "primary" } },
      props: { contentClass: "f-dialog__custom" },
    });
  }
}
export default EarningBuyAction;
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
