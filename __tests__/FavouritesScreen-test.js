import React from "react";
import * as renderer from "react-test-renderer";
import "jest-styled-components";
import { Provider } from "react-redux";
import { FavouriteScreen } from "../src/screens/FavouritesScreen";
import { UserLoggedIn } from "../src/screens/FavouritesScreen/UserLoggedIn";
import { UserNotLoggedIn } from "../src/screens/FavouritesScreen/UserNotLoggedIn";
import { store } from "../src/stores/store";

describe("Favourites Screen", () => {
    test("renders correctly", () => {
        const tree = renderer
            .create(
                <Provider store={store}>
                    <FavouriteScreen />
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
