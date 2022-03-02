<template>
  <v-container v-if="meta.show" class="earning-details-page">
    <earning-hold-card v-if="meta.hold" :product="meta.product" :asset="meta.asset" :hold="meta.hold" />

    <earning-brief-card v-else :product="meta.product" :asset="meta.asset" />

    <earning-details :product="meta.product" :asset="meta.asset" />

    <earning-actions :hold="meta.hold" :product="meta.product" />
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import mixins from "@/mixins";
import { GlobalGetters } from "@/store/types";
import EarningBriefCard from "@/components/earnings/EarningBriefCard.vue";
import EarningDetails from "@/components/earnings/EarningDetails.vue";
import EarningActions from "@/components/earnings/EarningActions.vue";
import EarningHoldCard from "@/components/earnings/EarningHoldCard.vue";

@Component({
  components: {
    EarningBriefCard,
    EarningHoldCard,
    EarningDetails,
    EarningActions,
  },
})
class EarningDetailPage extends Mixins(mixins.Page) {
  get title() {
    return "Earning Detail";
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
      hold: productMeta.hold,
      show,
    };
  }
}
export default EarningDetailPage;
</script>

<style lang="scss" scoped>
.earning-details-page {
  padding-bottom: 100px;
}
</style>
