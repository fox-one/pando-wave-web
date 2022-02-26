declare namespace State {
  export interface Wallet {
    // walletAssets: Record<string, API.MixinAsset>;
    assets: API.MixinAsset[];
  }

  export type GetAssetById = (id: string) => API.Asset | undefined;

  export type GetBalanceById = (id: string) => string;
}
