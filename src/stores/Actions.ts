import { KeyValue, MarketData } from "@constants/DataTypes";
import { store } from "@stores/store";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const FETCHMARKET = "FETCHMARKET";
export const FETCHFAVS = "FETCHFAVS";
export const FETCHCOINS = "FETCHCOINS";

export const FETCHOWNEDCOINS = "FETCHOWNEDCOINS";

export const SETERROR = "SETERROR";

const userLogin = (id: string, email: string, createdAt: string, name?: string, photoURL?: string) => ({
    type: LOGIN,
    id,
    email,
    createdAt,
    name,
    photoURL,
});

const userLogout = () => ({
    type: LOGOUT,
});

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

const setError = (error: String) => ({
    type: SETERROR,
    error,
});

export const loginAction = (uid: string, email: string, createdAt: string, name?: string, photoURL?: string) => {
    try {
        store.dispatch(userLogin(uid, email, createdAt, name, photoURL));
    } catch (error) {
        console.log(error);
    }
};

export const logoutAction = () => {
    try {
        store.dispatch(userLogout());
        store.dispatch(fetchMarket([]));
        store.dispatch(fetchFavs([]));
    } catch (error) {
        console.log(error);
    }
};

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

export const setErrorAction = (error: string) => {
    try {
        store.dispatch(setError(error));
    } catch (error) {
        console.log(error);
    }
};
