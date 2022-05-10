import React from "react";
import * as renderer from "react-test-renderer";
import { AccountBottomModal } from "../src/components/AccountBottomModal";
import { Button } from "../src/components/Button";
import "jest-styled-components";
import { shallow } from "enzyme";

describe("Accoun Bottom Modal tests", () => {
    test("renders correctly", () => {
        const tree = renderer.create(<AccountBottomModal primaryButtonText="Save" secondaryButtonText="Cancel" primaryButtonOnPress={jest.fn()} secondaryButtonOnPress={jest.fn()} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("renders correctly with error", () => {
        const tree = renderer
            .create(<AccountBottomModal primaryButtonText="Save" secondaryButtonText="Cancel" primaryButtonOnPress={jest.fn()} secondaryButtonOnPress={jest.fn()} errorText="error" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("Primary and Secondary button onPresses called correctly", () => {
        const primaryFn = jest.fn();
        const secondaryFn = jest.fn();

        const button = shallow(<AccountBottomModal primaryButtonText="Save" secondaryButtonText="Cancel" primaryButtonOnPress={primaryFn} secondaryButtonOnPress={secondaryFn} />).find(Button);

        //right button
        const buttonPrimary = button.last();
        buttonPrimary.simulate("press");
        expect(primaryFn).toHaveBeenCalled();

        //left button
        const buttonSecondary = button.first();
        buttonSecondary.simulate("press");
        expect(secondaryFn).toHaveBeenCalled();
    });
});
