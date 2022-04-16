export interface MarketData {
    ath: number;
    ath_change_percentage: number;
    ath_date: Date;
    atl: number;
    atl_change_percentage: number;
    atl_date: Date;
    circulating_supply: number;
    current_price: number;
    fully_diluted_valuation: number;
    high_24h: number;
    id: string;
    image: string;
    last_updated: Date;
    low_24h: number;
    market_cap: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    market_cap_rank: number;
    max_supply: number;
    name: string;
    price_change_24h: number;
    price_change_percentage_24h: number;
    roi?: any;
    sparkline_in_7d: { x: number; y: number };
    symbol: string;
    total_supply: number;
    total_volume: number;
    price_change_percentage_7d_in_currency: number;
    fav: boolean;
}

export interface Coins {
    id: string;
    userId: string;
    coinId: string;
    holdings: number;
    price: number;
    currency: string;
    image: string;
    symbol: string;
    current_price: number;
}

export interface KeyValue {
    id: string;
    name: string;
}

export type User = {
    id: string;
    email: string;
    createdAt: string;
    name?: string;
    photoURL?: string;
    isLoggedIn?: boolean;
};
