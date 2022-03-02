<template>
  <v-container v-if="meta.show" class="earning-redeem-page">
    <earning-redeem-form :asset="meta.asset" :product="meta.product" :hold="meta.hold" :amount.sync="amount" />
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import mixins from "@/mixins";
import EarningRedeemForm from "@/components/earnings/EarningRedeemForm.vue";

@Component({
  components: {
    EarningRedeemForm,
  },
})
class RedeemPage extends Mixins(mixins.Page, mixins.Earning) {
  amount = "";

  get title() {
    return "Redeem";
  }
}
export default RedeemPage;
</script>
