declare namespace API {
  export interface Asset {
    asset_id: string;
    chain_id: string;
    created_at: string;
    deleted_at: string | null;
    icon_url: string;
    name: string;
    order: number;
    price_btc: string;
    price_usd: string;
    symbol: string;
    updated_at: string;
  }

  export interface Product {
    account_id: string;
    asset_id: string;
    borrow_rate: string;
    borrow_rate_circle: number;
    borrow_rate_updated_at: string;
    capacity: string;
    created_at: string;
    deleted_at: null | string;
    description: string;
    id: number;
    interest_rate: string;
    max_amount_per_order: string;
    min_amount_per_order: string;
    name: string;
    period: number;
    redeemed: string;
    redemption_period: number;
    sold: string;
    updated_at: string;
    version: number;
  }

  export interface MyProduct {
    created_at: string;
    deleted_at: null | string;
    earning_product_id: number;
    id: number;
    normalized_amount: string;
    status: string;
    total_buy_amount: string;
    total_redeem_amount: string;
    updated_at: string;
    user_id: string;
    version: number;
  }

  export type Fiats = {
    code: string;
    rate: number;
  }[];

  export interface Profile {
    access_token: string;
    avatar_url: string;
    conversation_id: string;
    created_at: string;
    deleted_at: null | string;
    full_name: string;
    identity_number: string;
    lang: string;
    phone: string;
    updated_at: string;
    user_id: string;
  }

  export interface MixinAsset {
    asset_id: string;
    asset_key: string;
    balance: string;
    capitalization: number;
    chain_id: string;
    change_btc: string;
    change_usd: string;
    confirmations: number;
    destination: string;
    icon_url: string;
    mixin_id: string;
    name: string;
    price_btc: string;
    price_usd: string;
    reserve: string;
    symbol: string;
    tag: string;
    type: string;
  }
}
