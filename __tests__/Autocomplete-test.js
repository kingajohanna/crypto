import React from "react";
import { Autocomplete } from "../src/components/Autocomplete";
import "jest-styled-components";
import ShallowRenderer from "react-test-renderer/shallow";
import { coins } from "../__mocks__/cryptoServiceMocks";

test("Onpress called correctly", () => {
    const renderer = new ShallowRenderer();
    const result = renderer.render(<Autocomplete placeholder="Coins" onChangeText={jest.fn()} data={coins} />);
    expect(result).toMatchSnapshot();
});
