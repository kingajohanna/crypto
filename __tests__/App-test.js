import React from "react";
import { act } from "react-test-renderer";
import { Provider } from "react-redux";
import { render } from "@testing-library/react-native";
import App from "../src/App";
import { store } from "../src/stores/store";

describe("App", () => {
    it("renders app stack", async () => {
        const result = render(
            <Provider store={store}>
                <App />
            </Provider>,
        );
        await act(async () => {
            expect(result).toMatchSnapshot();
        });
    });
});
