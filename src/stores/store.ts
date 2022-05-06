import { combineReducers, createStore } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/lib/persistStore";
import { authReducer } from "@stores/reducers/UserReducer";
import { cryptoReducer } from "@stores/reducers/CryptoReducer";
import { errorReducer } from "@stores/reducers/ErrorReducer";

const rootReducer = combineReducers({
    user: authReducer,
    crypto: cryptoReducer,
    error: errorReducer,
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
