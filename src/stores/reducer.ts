import { MarketData } from "@constants/DataTypes";
import { FETCHCOINS, FETCHFAVS, FETCHMARKET, FETCHOWNEDCOINS, LOGIN, LOGOUT } from "@stores/Actions";
import { AnyAction } from "redux";

export type User = {
    id: string;
    email: string;
    createdAt: string;
    name?: string;
    photoURL?: string;
};

const initialUser = {
    id: "",
    email: "",
    createdAt: "",
    name: "",
    photoURL: "",
    isLoggedIn: false,
};

export type Crypto = {
    marketCoins: MarketData[];
    favs: MarketData[];
};

const initialCrypto = {
    marketCoins: [],
    favs: [],
    coins: [],
    ownedCoins: [],
};

export const authReducer = (state = initialUser, action: AnyAction) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                id: action.id,
                email: action.email,
                createdAt: action.createdAt,
                name: action.name,
                photoURL: action.photoURL,
                isLoggedIn: true,
            };
        case LOGOUT:
            return initialUser;
        default:
            return state;
    }
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
                ownedCoins: action.ownedCoins.slice(),
            };
        default:
            return state;
    }
};
