import { GetterTypes } from "./types";
import { GlobalGetters } from "../types";

export default {
  [GetterTypes.GET_PRODUCT_META](state, getters) {
    const getProductById: Getter.GetProductById = getters[GlobalGetters.GET_PRODUCT_BY_ID];
    const getAssetById: Getter.GetAssetById = getters[GlobalGetters.GET_ASSET_BY_ID];

    return (id: string) => {
      const product = getProductById(id);
      const asset = getAssetById(product?.asset_id ?? "");

      return {
        product: product || null,
        asset: asset || null,
      };
    };
  },
};
