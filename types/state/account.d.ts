declare namespace State {
  export interface Account {
    profile: API.Profile | null;
    products: API.MyProduct[];
  }
}
