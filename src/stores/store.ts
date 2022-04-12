import { authReducer, cryptoReducer } from "@stores/reducer";
import { combineReducers, createStore } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
    user: authReducer,
    crypto: cryptoReducer,
});

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["user", "crypto"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
