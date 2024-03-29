import { Colors } from "@theme/Colors";
import React from "react";
import { PressableProps } from "react-native";
import styled from "styled-components/native";

/**
 *    rendering when something happen with the markedData or the internet connection during a request
 */
export const ErrorComponent: React.FC<PressableProps> = (props) => {
    return (
        <Container onPress={props.onPress}>
            <Text>Something went wrong, tap to retry!</Text>
        </Container>
    );
};

const Container = styled.Pressable({
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
});

const Text = styled.Text({
    color: Colors.fluorescentBlue,
    fontSize: 24,
});
