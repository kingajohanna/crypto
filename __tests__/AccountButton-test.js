import React from "react";
import * as renderer from "react-test-renderer";
import { AccountButton } from "../src/components/AccountButton";
import "jest-styled-components";

test("renders correctly", () => {
    const tree = renderer
        .create(
            <>
                <AccountButton.Google />
                <AccountButton.EmailLogIn />
                <AccountButton.EmailSignIn />
                <AccountButton.Logout />
                <AccountButton.Delete />
            </>,
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
