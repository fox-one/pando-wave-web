<template>
  <div class="redeem-form-informations">
    <base-information-item-list :informations="informations" class="mt-3" />
    <f-divider class="mt-3 mb-6" />
    <div class="redemption-warning">
      {{ $t("redemption_warning", { period: redemptionPeriod }) }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
class RedeemFormInformations extends Vue {
  @Prop() product!: API.Product;

  @Prop() asset!: API.Asset;

  get informations() {
    return [
      {
        label: "Redemption Time",
        value: this.redemptionPeriod,
      },
    ];
  }

  get redemptionPeriod() {
    return this.$utils.wave.getRedeemPeriod(this, this.product.redemption_period);
  }
}
export default RedeemFormInformations;
</script>

<style lang="scss" scoped>
.redemption-warning {
  color: var(--v-warning-base);
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
}
</style>
