import { authReducer, cryptoReducer } from "@stores/reducer";
import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
    user: authReducer,
    crypto: cryptoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
