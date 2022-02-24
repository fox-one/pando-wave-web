declare namespace State {
  export interface Market {
    products: API.Product[];
    assets: API.Asset[];
    fiats: API.Fiats;
  }
}
