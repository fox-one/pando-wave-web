declare namespace Getter {
  export interface ProductMeta {
    product: API.Product | null;
    asset: API.Product | null;
  }

  export type GetProductById = (id: string) => API.Product | undefined;

  export type GetAssetById = (id: string) => API.Asset | undefined;

  export type GetProductMeta = (id: string) => ProductMeta;
}
