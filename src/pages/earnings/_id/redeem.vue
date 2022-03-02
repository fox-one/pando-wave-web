<template>
  <v-container v-if="meta.show" class="earning-redeem-page">
    <earning-redeem-form :asset="meta.asset" :product="meta.product" :hold="meta.hold" :amount.sync="amount" />

    <redeem-form-informations :asset="meta.asset" :product="meta.product" />
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import mixins from "@/mixins";
import EarningRedeemForm from "@/components/earnings/EarningRedeemForm.vue";
import RedeemFormInformations from "@/components/earnings/RedeemFormInformations.vue";

@Component({
  components: {
    EarningRedeemForm,
    RedeemFormInformations,
  },
})
class RedeemPage extends Mixins(mixins.Page, mixins.Earning) {
  amount = "";

  get title() {
    return this.$t("redeem");
  }
}
export default RedeemPage;
</script>
