import { AnyAction } from "redux";
import { LOGIN, LOGOUT } from "@stores/actions/UserActions";

export type User = {
    id: string;
    email: string;
    createdAt: string;
    name: string;
    photoURL: string;
    isLoggedIn: boolean;
};

const initialUser: User = {
    id: "",
    email: "",
    createdAt: "",
    name: "",
    photoURL: "",
    isLoggedIn: false,
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
