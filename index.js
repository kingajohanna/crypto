/**
 * @format
 */

import { AppRegistry } from "react-native";
import React from "react";
import App from "./src/App";
import { name as appName } from "./app.json";
import { Provider } from "react-redux";
import { store } from "./src/stores/store";

const Init = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent(appName, () => Init);
