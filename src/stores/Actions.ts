import auth from "@react-native-firebase/auth";
import { store } from "@stores/store";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const FETCH = "FETCH";

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

/*const fetch = () => ({
    type: FETCH,
});*/

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

/*export const fetchAction = () => {
    try {
        store.dispatch(userLogout());
    } catch (error) {
        console.log(error);
    }
};*/
