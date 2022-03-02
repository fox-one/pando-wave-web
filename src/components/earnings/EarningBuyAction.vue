<template>
  <base-bottom-action-sheet>
    <div class="earning-actions">
      <f-button :loading="loading" :disabled="!valid" color="primary" @click="handleConfirm">
        {{ $t("confirm") }}
      </f-button>
    </div>
  </base-bottom-action-sheet>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { VIcon } from "vuetify/lib";

@Component
class EarningBuyAction extends Vue {
  @Prop() amount!: string;

  @Prop() asset!: API.Asset;

  @Prop() product!: API.Product;

  @Prop() valid!: boolean;

  loading = false;

  async handleConfirm() {
    this.loading = true;

    try {
      await this.$utils.payment.buy(
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
    } catch (error) {
      this.$utils.helper.errorHandler(this, error);
    }

    this.loading = false;
  }

  handleSuccess() {
    const h = this.$createElement;

    this.$emit("success");

    this.$utils.app.refresh(this);
    this.$uikit.dialog.show({
      title: h("div", { staticClass: "d-flex align-center" }, [
        h(VIcon, { staticClass: "mr-2" }, ["$IconCheck"]),
        h("span", this.$t("messeage.buy_successfully") as string),
      ]),
      text: this.$t("messeage.processed") as string,
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
