import React from "react";
import * as renderer from "react-test-renderer";
import { AccountBottomModal } from "../src/components/AccountBottomModal";
import "jest-styled-components";

test("renders correctly", () => {
    const tree = renderer
        .create(
            <>
                <AccountBottomModal primaryButtonText="Save" secondaryButtonText="Cancel" primaryButtonOnPress={jest.fn()} secondaryButtonOnPress={jest.fn()} />
                <AccountBottomModal primaryButtonText="Save" secondaryButtonText="Cancel" primaryButtonOnPress={jest.fn()} secondaryButtonOnPress={jest.fn()} errorText="error" />
            </>,
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
