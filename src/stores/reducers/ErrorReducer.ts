import { Coins, KeyValue, MarketData } from "@constants/DataTypes";
import { LOGIN, LOGOUT } from "@stores/actions/UserActions";
import { FETCHCOINS, FETCHFAVS, FETCHMARKET, FETCHOWNEDCOINS } from "@actions/CryptoActions";
import { SETAUTHERROR, SETERROR } from "@actions/ErrorActions";
import { AnyAction } from "redux";

export type Error = {
    error: string;
    authError: string;
};

const initialError: Error = {
    error: "",
    authError: "",
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
