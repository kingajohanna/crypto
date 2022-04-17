import React from "react";
import "jest-styled-components";
import * as renderer from "react-test-renderer";
import { DeleteAlert, LogoutAlert } from "../src/components/Alert";

jest.useFakeTimers();
test("renders correctly", () => {
    const tree = renderer
        .create(
            <>
                <DeleteAlert visible={true} setVisible={jest.fn()} />
                <LogoutAlert visible={true} setVisible={jest.fn()} />
            </>,
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
