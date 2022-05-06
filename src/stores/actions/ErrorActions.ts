import { store } from "@stores/store";

export const SETERROR = "SETERROR";
export const SETAUTHERROR = "SETAUTHERROR";

const setError = (error: String) => ({
    type: SETERROR,
    error,
});

const setAuthError = (error: String) => ({
    type: SETAUTHERROR,
    error,
});

export const setErrorAction = (error: string) => {
    try {
        store.dispatch(setError(error));
    } catch (error) {
        console.log(error);
    }
};

export const setAuthErrorAction = (error: string) => {
    try {
        store.dispatch(setAuthError(error));
    } catch (error) {
        console.log(error);
    }
};
