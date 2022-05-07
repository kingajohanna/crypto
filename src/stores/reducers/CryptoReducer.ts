import { AnyAction } from "redux";
import { Coins, KeyValue, MarketData } from "@constants/DataTypes";
import { FETCHCOINS, FETCHFAVS, FETCHMARKET, FETCHOWNEDCOINS } from "@actions/CryptoActions";

export type Crypto = {
    marketCoins: MarketData[];
    favs: MarketData[];
    ownedCoins: Coins[];
    coins: KeyValue[];
};

const initialCrypto: Crypto = {
    marketCoins: [],
    favs: [],
    coins: [],
    ownedCoins: [],
};

export const cryptoReducer = (state = initialCrypto, action: AnyAction) => {
    switch (action.type) {
        case FETCHMARKET:
            return {
                ...state,
                marketCoins: action.marketCoins.slice(),
            };
        case FETCHFAVS:
            return {
                ...state,
                favs: action.favs.slice(),
            };
        case FETCHCOINS:
            return {
                ...state,
                coins: action.coins.slice(),
            };
        case FETCHOWNEDCOINS:
            return {
                ...state,
                ownedCoins: action.ownedCoins,
            };
        default:
            return state;
    }
};
