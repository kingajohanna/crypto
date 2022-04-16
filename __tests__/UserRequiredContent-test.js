import React from "react";
import * as renderer from "react-test-renderer";
import { UserRequiredContent } from "../src/components/UserRequiredContent";
import "jest-styled-components";

test("renders correctly", () => {
    const tree = renderer.create(<UserRequiredContent />).toJSON();
    expect(tree).toMatchSnapshot();
});
