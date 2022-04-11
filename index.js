/**
 * @format
 */

import { AppRegistry } from "react-native";
import React from "react";
import App from "./src/App";
import { name as appName } from "./app.json";
import { Provider } from "react-redux";
import { store, persistor } from "./src/stores/store";
import { PersistGate } from "redux-persist/integration/react";

const Init = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);

AppRegistry.registerComponent(appName, () => Init);
