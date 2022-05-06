import { KeyValue, MarketData } from "@constants/DataTypes";
import { store } from "@stores/store";

export const FETCHMARKET = "FETCHMARKET";
export const FETCHFAVS = "FETCHFAVS";
export const FETCHCOINS = "FETCHCOINS";

export const FETCHOWNEDCOINS = "FETCHOWNEDCOINS";

const fetchMarket = (marketCoins: MarketData[]) => ({
    type: FETCHMARKET,
    marketCoins,
});

const fetchFavs = (favs: MarketData[]) => ({
    type: FETCHFAVS,
    favs,
});

const fetchCoins = (coins: KeyValue[]) => ({
    type: FETCHCOINS,
    coins,
});

const fetchOwnedCoins = (ownedCoins: KeyValue[]) => ({
    type: FETCHOWNEDCOINS,
    ownedCoins,
});

export const fetchMarketAction = (marketCoins: MarketData[]) => {
    try {
        store.dispatch(fetchMarket(marketCoins));
    } catch (error) {
        console.log(error);
    }
};

export const fetchFavsAction = (favs: MarketData[]) => {
    try {
        store.dispatch(fetchFavs(favs));
    } catch (error) {
        console.log(error);
    }
};

export const fetchCoinsAction = (coins: KeyValue[]) => {
    try {
        store.dispatch(fetchCoins(coins));
    } catch (error) {
        console.log(error);
    }
};

export const fetchOwnedCoinsAction = (ownedCoins: KeyValue[]) => {
    try {
        store.dispatch(fetchOwnedCoins(ownedCoins));
    } catch (error) {
        console.log(error);
    }
};
