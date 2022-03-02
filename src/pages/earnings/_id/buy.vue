<template>
  <v-container v-if="meta.show">
    <earning-buy-form :asset="meta.asset" :amount.sync="amount" :product="meta.product" />

    <buy-form-informations :asset="meta.asset" :product="meta.product" :amount="amount" />
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import mixins from "@/mixins";
import EarningBuyForm from "@/components/earnings/EarningBuyForm.vue";
import BuyFormInformations from "@/components/earnings/BuyFormInformations.vue";

@Component({
  components: {
    EarningBuyForm,
    BuyFormInformations,
  },
})
class EarningBuyPage extends Mixins(mixins.Page, mixins.Earning) {
  amount = "";

  get title() {
    return "Buy";
  }
}
export default EarningBuyPage;
</script>
