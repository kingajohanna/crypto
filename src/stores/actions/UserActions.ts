import { store } from "@stores/store";
import { fetchFavsAction, fetchMarketAction, fetchOwnedCoinsAction } from "@actions/CryptoActions";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

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

export const loginAction = (uid: string, email: string, createdAt: string, name?: string, photoURL?: string) => {
    try {
        fetchMarketAction([]);
        store.dispatch(userLogin(uid, email, createdAt, name, photoURL));
    } catch (error) {
        console.log(error);
    }
};

export const logoutAction = () => {
    try {
        store.dispatch(userLogout());
        fetchMarketAction([]);
        fetchFavsAction([]);
        fetchOwnedCoinsAction([]);
    } catch (error) {
        console.log(error);
    }
};
