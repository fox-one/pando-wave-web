declare namespace Getter {
  export interface ProductMeta {
    product: API.Product | null;
    asset: API.Asset | null;
    hold: API.MyProduct | null;
  }

  export type GetProductById = (id: string) => API.Product | undefined;

  export type GetMyProductById = (id: string) => API.MyProduct | undefined;

  export type GetAssetById = (id: string) => API.Asset | undefined;

  export type GetProductMeta = (id: string) => ProductMeta;
}
