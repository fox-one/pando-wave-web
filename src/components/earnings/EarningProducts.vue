<template>
  <div class="earning-products">
    <template v-for="(product, index) in mergedProducts">
      <earning-product-bought v-if="product.rel" :product="product" :key="index" />
      <earning-product v-else :product="product" :key="index" />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EarningProduct from "./EarningProduct.vue";
import EarningProductBought from "./EarningProductBought.vue";
import _ from "lodash";

@Component({
  components: {
    EarningProduct,
    EarningProductBought,
  },
})
class EarningProducts extends Vue {
  get myProducts() {
    return this.$store.state.account.products;
  }

  get products() {
    return this.$store.state.market.products;
  }

  get mergedProducts() {
    return this.products.map((x) => {
      const rel = _.find(this.myProducts, (y) => y.earning_product_id === x.id);
      x.rel = rel || null;
      return x;
    });
  }
}
export default EarningProducts;
</script>
