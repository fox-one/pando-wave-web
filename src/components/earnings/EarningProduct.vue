<template>
  <div v-if="meta.show" class="earning-product" @click="handleToDetail">
    <div class="header">
      <v-avatar :size="32">
        <v-img :src="meta.logo" />
      </v-avatar>

      <div class="name mx-3">
        {{ meta.name }}
      </div>

      <f-button fab :color="meta.btnColor" width="32" height="32" @click="handleToDetail">
        <v-icon size="16">$FIconChevronRight4PBold</v-icon>
      </f-button>
    </div>

    <div class="body mt-6">
      <div class="field">
        <div class="field-value">{{ meta.balText }}</div>
        <div class="field-label mt-2">
          {{ $t("bal") }}
        </div>
      </div>
      <div class="field text-right">
        <div class="field-value secondary--text">{{ meta.arorText }}</div>
        <div class="field-label mt-2">
          {{ $t("aror") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { GlobalGetters } from "@/store/types";

@Component
class EarningProduct extends Vue {
  @Prop() product!: API.Product;

  get meta() {
    const getProductMeta: Getter.GetProductMeta = this.$store.getters[GlobalGetters.GET_PRODUCT_META];
    const productMeta = getProductMeta(this.product.id + "");
    const product = productMeta.product!;
    const asset = productMeta.asset!;
    const show = product && asset;
    const { period, interest_rate, capacity, sold, name } = product;
    const { symbol, icon_url } = asset;
    const aror = this.$utils.wave.getAror(period, interest_rate);
    const bal = +capacity - +sold;

    return {
      show,
      name,
      logo: icon_url,
      arorText: this.$utils.number.toPercent({ n: aror }),
      balText: bal + " " + symbol,
      btnColor: this.$vuetify.theme.dark ? "greyscale_4" : "greyscale_7",
    };
  }

  handleToDetail() {
    this.$router.push({ name: "earnings-id", params: { id: this.product.id + "" } });
  }
}
export default EarningProduct;
</script>

<style lang="scss" scoped>
.earning-product {
  background: var(--v-greyscale_6-base);
  border-radius: 8px;
  padding: 24px;

  .header {
    display: flex;
    align-items: center;

    .name {
      flex: 1;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
    }
  }

  .body {
    display: flex;
    justify-content: space-between;

    .field {
      .field-value {
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
      }

      .field-label {
        font-size: 12px;
        line-height: 15px;
        color: var(--v-greyscale_3-base);
      }
    }
  }
}

.theme--light .f-btn {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.06);
}

.theme--dark .f-btn {
  box-shadow: 0px 0px 16px rgba(255, 255, 255, 0.06);
}
</style>
