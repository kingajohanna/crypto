import React from "react";
import * as renderer from "react-test-renderer";
import "jest-styled-components";
import { Provider } from "react-redux";
import { MyCoinsScreen } from "../src/screens/MyCoinsScreen";
import { UserLoggedIn } from "../src/screens/MyCoinsScreen/UserLoggedIn";
import { UserNotLoggedIn } from "../src/screens/MyCoinsScreen/UserNotLoggedIn";
import { store } from "../src/stores/store";

jest.useFakeTimers();
describe("Favourites Screen", () => {
    test("renders correctly", () => {
        const tree = renderer
            .create(
                <Provider store={store}>
                    <MyCoinsScreen />
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
        const tree = renderer
            .create(
                <Provider store={store}>
                    <UserNotLoggedIn />
                </Provider>,
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
