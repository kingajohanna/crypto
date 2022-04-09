import { MarketData } from "@constants/MarketData";
import { store } from "@stores/store";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const FETCHMARKET = "FETCHMARKET";
export const FETCHFAVS = "FETCHFAVS";

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
