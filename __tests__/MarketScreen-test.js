import React from "react";
import * as renderer from "react-test-renderer";
import "jest-styled-components";
import { Provider } from "react-redux";
import { MarketScreen } from "../src/screens/MarketScreen";
import { marketdata } from "../__mocks__/cryptoServiceMocks";
import { store } from "../src/stores/store";

test("renders correctly", () => {
    // Cache original functionality
    const realUseState = React.useState;

    // Stub the initial state
    const stubInitialState = marketdata.data;

    // Mock useState before rendering your component
    jest.spyOn(React, "useState").mockImplementationOnce(() => realUseState(stubInitialState));

    const tree = renderer
        .create(
            <Provider store={store}>
                <MarketScreen />
            </Provider>,
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
