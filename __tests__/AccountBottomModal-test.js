import React from "react";
import * as renderer from "react-test-renderer";
import { AccountBottomModal } from "../src/components/AccountBottomModal";
import { Button } from "../src/components/Button";
import "jest-styled-components";
import { shallow } from "enzyme";

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

test("Onpress called correctly", () => {
    const primaryFn = jest.fn();
    const secondaryFn = jest.fn();

    const buttonPrimary = shallow(<AccountBottomModal primaryButtonText="Save" secondaryButtonText="Cancel" primaryButtonOnPress={primaryFn} secondaryButtonOnPress={secondaryFn} />)
        .find(Button)
        .last();
    buttonPrimary.simulate("press");
    expect(primaryFn).toHaveBeenCalled();

    const buttonSecondary = shallow(<AccountBottomModal primaryButtonText="Save" secondaryButtonText="Cancel" primaryButtonOnPress={primaryFn} secondaryButtonOnPress={secondaryFn} />)
        .find(Button)
        .first();
    buttonSecondary.simulate("press");
    expect(secondaryFn).toHaveBeenCalled();
});
