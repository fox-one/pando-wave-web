import { Vue, Component } from "vue-property-decorator";
import { GlobalGetters } from "@/store/types";

@Component
export default class EarningDetail extends Vue {
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
