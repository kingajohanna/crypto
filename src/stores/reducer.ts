import { Coins, KeyValue, MarketData } from "@constants/DataTypes";
import { FETCHCOINS, FETCHFAVS, FETCHMARKET, FETCHOWNEDCOINS, LOGIN, LOGOUT, SETAUTHERROR, SETERROR } from "@stores/Actions";
import { AnyAction } from "redux";

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
    ownedCoins: Coins[];
    coins: KeyValue[];
};

const initialCrypto = {
    marketCoins: [],
    favs: [],
    coins: [],
    ownedCoins: [],
};

export type Error = {
    error: string;
    authError: string;
};

const initialError = {
    error: "",
    authError: "",
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
                ownedCoins: action.ownedCoins,
            };
        default:
            return state;
    }
};

export const errorReducer = (state = initialError, action: AnyAction) => {
    switch (action.type) {
        case SETERROR:
            return {
                ...state,
                error: action.error.slice(),
            };
        case SETAUTHERROR:
            return {
                ...state,
                authError: action.error.slice(),
            };
        default:
            return state;
    }
};
