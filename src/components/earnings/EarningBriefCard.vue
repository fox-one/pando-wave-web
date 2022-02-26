<template>
  <div class="earning-brief-card">
    <div class="logo">
      <v-avatar :size="48">
        <v-img :src="meta.logo" />
      </v-avatar>
    </div>

    <div class="aror-value f-number mt-2">
      <span>{{ meta.arorText }}</span>
    </div>

    <div class="aror-label f-number mt-2">
      <span>{{ meta.arorLabel }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class EarningBriefCard extends Vue {
  @Prop() product!: API.Product;

  @Prop() asset!: API.Asset;

  get meta() {
    const logo = this.asset.icon_url;
    const symbol = this.asset.symbol;
    const aror = this.$utils.wave.getAror(this.product.period, this.product.interest_rate);

    return {
      logo,
      arorText: this.$utils.number.toPercent({ n: aror }),
      arorLabel: `${symbol} AROR`,
    };
  }
}
export default EarningBriefCard;
</script>

<style lang="scss" scoped>
.earning-brief-card {
  height: 272px;
  background: url("/images/bg_earning_brief.png") 0 88px/100% 184px no-repeat, #6371e8;
  border-radius: 8px;
  padding: 40px;

  .aror-value {
    font-weight: bold;
    font-size: 32px;
    line-height: 39px;
  }

  .aror-label {
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
  }
}
</style>
