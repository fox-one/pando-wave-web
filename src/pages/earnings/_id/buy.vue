<template>
  <v-container v-if="meta.show"> </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { GlobalGetters } from "@/store/types";
import mixins from "@/mixins";

@Component
class EarningBuyPage extends Mixins(mixins.Page) {
  get title() {
    return "Earning Buy";
  }

  get id() {
    return this.$route.params.id;
  }

  get meta() {
    const getProductMeta: Getter.GetProductMeta = this.$store.getters[GlobalGetters.GET_PRODUCT_META];
    const productMeta = getProductMeta(this.id);
    const show = Boolean(productMeta.product && productMeta.asset);

    return {
      product: productMeta.product,
      asset: productMeta.asset,
      show,
    };
  }
}
export default EarningBuyPage;
</script>
