<template>
  <div class="earning-products">
    <earning-product v-for="(product, index) in products" :product="product" :key="index" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EarningProduct from "./EarningProduct.vue";

@Component({
  components: {
    EarningProduct,
  },
})
class EarningProducts extends Vue {
  get products() {
    return this.$store.state.market.products;
  }
}
export default EarningProducts;
</script>
