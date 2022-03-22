<template>
  <div v-if="meta.show" class="earning-product" @click="handleToDetail">
    <div class="header">
      <v-avatar :size="32">
        <v-img :src="meta.logo" />
      </v-avatar>

      <div class="name mx-3">
        {{ meta.name }}
      </div>

      <f-button fab light width="32" height="32" @click="handleToDetail">
        <v-icon size="16">$FIconAdd4PBold</v-icon>
      </f-button>
    </div>

    <div class="footer mt-6 text-center">
      <div class="field text-center font-weight-medium">
        <span class="field-label">
          {{ $t("about") }}
        </span>
        <span class="field-label"> {{ meta.arorText }} </span>
        <span class="field-label">
          {{ $t("aror") }}
        </span>
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
    const toPercent = this.$utils.number.toPercent;

    const getProductMeta: Getter.GetProductMeta = this.$store.getters[GlobalGetters.GET_PRODUCT_META];
    const productMeta = getProductMeta(this.product.id + "");
    const product = productMeta.product!;
    const asset = productMeta.asset!;
    const show = product && asset;
    const { period, interest_rate, name } = product;
    const { symbol, icon_url } = asset;
    const aror = this.$utils.wave.getAror(period, interest_rate);

    return {
      show,
      name,
      symbol,
      logo: icon_url,
      arorText: toPercent({ n: aror }),
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
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 16px;
  background-color: #6371e8;
  color: #fff;

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
    }
  }

  .footer {
    background-color: #4e5bca;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    margin-left: -24px;
    margin-right: -24px;
    margin-bottom: -24px;
    padding: 16px 24px;
    .field {
      &:before,
      &:after {
        content: " ";
        background-color: #6371e8;
        height: 2px;
        width: 10px;
        display: inline-block;
        vertical-align: middle;
        margin: 8px;
      }
    }
  }
}

.f-btn {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.06);
}
</style>
