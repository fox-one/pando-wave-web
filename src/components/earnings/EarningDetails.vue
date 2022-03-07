<template>
  <div class="earning-details">
    <div class="section">
      <div class="section-icon">
        <v-icon>$FIconList</v-icon>
      </div>
      <div class="section-content">
        <div class="section-title">
          {{ $t("description") }}
        </div>

        <div class="section-value">
          {{ meta.description }}
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-icon">
        <v-icon>$FIconStatistic</v-icon>
      </div>
      <div class="section-content">
        <div class="section-title">
          {{ $t("capacity") }}
        </div>
        <div class="section-value">
          <div>{{ meta.capacityText }}</div>
          <v-progress-linear
            :value="meta.capacityRate"
            color="secondary"
            background-color="greyscale_6"
            rounded
            class="mt-3"
          />
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-icon">
        <v-icon>$IconBullet</v-icon>
      </div>
      <div class="section-content">
        <div class="section-title">
          {{ $t("details") }}
        </div>

        <div class="section-value">
          <div>{{ $t("message.interest_yield") }}</div>

          <base-information-item-list :informations="meta.informations" class="mt-3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
class EarningDetails extends Vue {
  @Prop() product!: API.Product;

  @Prop() asset!: API.Asset;

  get meta() {
    const format = this.$utils.number.format;

    const { product, asset } = this;
    const { symbol } = asset;
    const { description, capacity, sold, period, min_amount_per_order, max_amount_per_order } = product;

    return {
      description,
      capacityText: `${sold}/${capacity} ${symbol}`,
      capacityRate: ((+sold / +capacity) * 100).toFixed(2),
      informations: [
        {
          label: this.$t("interest_period"),
          value: period + " " + this.$t("seconds"),
        },
        {
          label: this.$t("min_amount_per_order"),
          value: format({ n: min_amount_per_order }) + " " + symbol,
        },
        {
          label: this.$t("max_amount_per_order"),
          value: format({ n: max_amount_per_order }) + " " + symbol,
        },
        {
          label: this.$t("redemption_time"),
          value: 5 + " " + this.$t("minutes"),
        },
      ],
    };
  }
}
export default EarningDetails;
</script>

<style lang="scss" scoped>
.earning-details {
  .section {
    margin-top: 24px;
    color: var(--v-greyscale_4-base);
    display: flex;
  }

  .section-content {
    flex: 1;
  }

  .section-icon {
    .v-icon {
      color: var(--v-greyscale_4-base);
      margin-right: 16px;
    }
  }

  .section-title {
    height: 24px;
    line-height: 28px;
    font-size: 14px;
    font-weight: 500;
  }

  .section-value {
    margin-top: 20px;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: var(--v-greyscale_1-base);
  }
}
</style>
