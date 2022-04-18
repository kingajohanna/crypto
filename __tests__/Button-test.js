import React from "react";
import { shallow } from "enzyme";
import { Button, Container } from "../src/components/Button";
import "jest-styled-components";

test("Onpress called correctly", () => {
    const mockCallBack = jest.fn();

    const button = shallow(<Button onPress={mockCallBack} title="ok" />).find(Container);
    button.simulate("press");
    expect(mockCallBack.mock.calls.length).toEqual(1);
});
