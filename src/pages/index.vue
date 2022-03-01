<template>
  <v-container>
    <earning-products />
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import mixins from "@/mixins";
import EarningProducts from "@/components/earnings/EarningProducts.vue";

@Component({
  components: {
    EarningProducts,
  },
})
class IndexPage extends Mixins(mixins.Page) {
  get appbar() {
    return {
      back: false,
      style: "home" as const,
    };
  }
}
export default IndexPage;
</script>

<style lang="scss" scoped></style>
