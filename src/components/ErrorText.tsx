import React from "react";
import { TextProps } from "react-native";
import styled from "styled-components/native";

export const ErrorText: React.FC<TextProps> = (props) => {
    return <Text>{props.children}</Text>;
};

const Text = styled.Text({
    alignSelf: "center",
    width: 340,
    paddingBottom: 8,
    fontSize: 14,
    fontWeight: 400,
    color: "#ff0000",
    justifyContent: "center",
});
