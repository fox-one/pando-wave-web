<template>
  <v-container v-if="meta.show">
    <earning-buy-form :asset="meta.asset" :amount.sync="amount" :product="meta.product" />

    <buy-form-informations :asset="meta.asset" :product="meta.product" :amount="amount" />
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { GlobalGetters } from "@/store/types";
import mixins from "@/mixins";
import EarningBuyForm from "@/components/earnings/EarningBuyForm.vue";
import BuyFormInformations from "@/components/earnings/BuyFormInformations.vue";

@Component({
  components: {
    EarningBuyForm,
    BuyFormInformations,
  },
})
class EarningBuyPage extends Mixins(mixins.Page) {
  amount = "";

  get title() {
    return "Buy";
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
