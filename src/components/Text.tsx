import React from "react";
import styled from "styled-components/native";
import { Colors } from "@theme/Colors";
import { TextProps } from "react-native";

/*
    Styled Text, used in login screen
*/
export const Text: React.FC<TextProps> = (props) => {
    return <StyledText onPress={props.onPress}>{props.children}</StyledText>;
};

const StyledText = styled.Text({
    width: 340,
    textAlign: "right",
    color: Colors.fluorescentBlue,
    fontSize: 16,
});
