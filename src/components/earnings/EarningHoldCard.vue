<template>
  <div class="earning-hold-card">
    <div class="field balance">
      <div class="field-label">
        {{ $t("bal") }}
      </div>
      <div class="field-value f-number">
        <span>{{ meta.position }}</span>
        <span class="symbol">{{ meta.symbol }}</span>
      </div>
    </div>

    <div>
      <div class="field mb-4">
        <div class="field-label">
          {{ $t("total_yield") }}
        </div>
        <div class="field-value">
          <span>{{ meta.revenue }}</span>
          <span class="symbol">{{ meta.symbol }}</span>
        </div>
      </div>

      <div class="field">
        <div class="field-label">
          {{ $t("aror") }}
        </div>
        <div class="field-value">
          <span>{{ meta.aror }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import BigNumber from "bignumber.js";

@Component
class EarningHoldCard extends Vue {
  @Prop() hold!: API.MyProduct;

  @Prop() product!: API.Product;

  @Prop() asset!: API.Asset;

  get meta() {
    const toPercent = this.$utils.number.toPercent;
    const format = this.$utils.number.format;
    const getAror = this.$utils.wave.getAror;
    const getPosition = this.$utils.wave.getPosition;

    const { product, asset, hold } = this;
    const { symbol } = asset;
    const { period, interest_rate, borrow_rate } = product;
    const { normalized_amount, total_buy_amount, total_redeem_amount } = hold;

    const aror = getAror(period, interest_rate);
    const position = getPosition(normalized_amount, borrow_rate);
    const revenue = position - +total_buy_amount + +total_redeem_amount;

    return {
      symbol,
      aror: toPercent({ n: aror }),
      position: format({ n: position, dp: 8, mode: BigNumber.ROUND_DOWN }),
      revenue: format({ n: revenue, dp: 8, mode: BigNumber.ROUND_DOWN }),
    };
  }
}
export default EarningHoldCard;
</script>

<style lang="scss" scoped>
.earning-hold-card {
  height: 272px;
  border-radius: 8px;
  padding: 24px;
  background: url("/images/bg_earning_hold.png") 0 88px/100% 184px no-repeat, #6371e8;
  display: flex;
  flex-direction: column;

  .balance {
    flex: 1;

    .field-value {
      font-weight: bold;
      font-size: 23px;
      line-height: 23px;

      .symbol {
        font-size: 16px;
        line-height: 16px;
      }
    }
  }

  .field-label {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #b8bfff;
    margin-bottom: 16px;
  }

  .field-value {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
  }
}
</style>
