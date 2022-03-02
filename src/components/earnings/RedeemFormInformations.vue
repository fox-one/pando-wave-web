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
    if (this.product.redemption_period < 3600) {
      // <= 1 hour
      return this.$t("minutes_suffix", {
        n: (this.product.redemption_period / 60).toFixed(0),
      });
    } else if (this.product.redemption_period < 3600 * 24) {
      // <= 1 day
      return this.$t("hours_suffix", {
        n: (this.product.redemption_period / 60 / 60).toFixed(0),
      });
    } else {
      return this.$t("days_suffix", {
        n: (this.product.redemption_period / 60 / 60 / 24).toFixed(0),
      });
    }
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
