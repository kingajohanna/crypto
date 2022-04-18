import React from "react";
import { PressableProps } from "react-native";
import styled from "styled-components/native";
import { Colors } from "@theme/Colors";

type ButtonProps = {
    title: string;
} & PressableProps;

/*
    basic button
*/
export const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
    return (
        <Container onPress={onPress}>
            <Text>{title}</Text>
        </Container>
    );
};

//export for jest test
export const Container = styled.Pressable({
    backgroundColor: Colors.fluorescentBlue,
    width: 120,
    height: 44,
    borderWidth: 2,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.cadetBlue,
});

const Text = styled.Text({
    color: Colors.gunmetal,
    fontSize: 18,
});
