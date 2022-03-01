export function errorHandler(vm: Vue, error: any) {
  const code = error.code;

  let locale = "";
  if (code && vm.$t(`errorcode.${code}`) !== code) {
    locale = vm.$t(`errorcode.${code}`) as string;
  }

  const message = error.message || error.msg || locale || "Unknown Error";

  vm.$uikit.toast.error({ message: `${code} ${message}` });
}

export function convertToSelectAsset(asset: API.Asset) {
  return {
    symbol: asset.symbol,
    name: asset.name,
    logo: asset.icon_url,
    id: asset.asset_id,
    price: asset.price_usd,
  };
}
