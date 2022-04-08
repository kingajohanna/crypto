import { authReducer } from "@stores/reducer";
import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
    user: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
