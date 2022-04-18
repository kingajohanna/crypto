import React from "react";
import * as renderer from "react-test-renderer";
import "jest-styled-components";
import ShallowRenderer from "react-test-renderer/shallow";
import { Provider } from "react-redux";
import { AccountScreen } from "../src/screens/AccountScreen";
import { UserLoggedIn } from "../src/screens/AccountScreen/UserLoggedIn";
import { UserNotLoggedIn } from "../src/screens/AccountScreen/UserNotLoggedIn";
import { store } from "../src/stores/store";

jest.useFakeTimers();

describe("Account Screen", () => {
    test("renders correctly", () => {
        const tree = renderer
            .create(
                <Provider store={store}>
                    <AccountScreen />
                </Provider>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("UserLoggedIn renders correctly", () => {
        const tree = renderer
            .create(
                <Provider store={store}>
                    <UserLoggedIn />
                </Provider>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("UserNotLoggedIn renders correctly", () => {
        const renderer = new ShallowRenderer();
        const tree = renderer.render(
            <Provider store={store}>
                <UserNotLoggedIn />
            </Provider>,
        );

        expect(tree).toMatchSnapshot();
    });
});
