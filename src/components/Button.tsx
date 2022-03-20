import React from "react";
import styled from "styled-components/native";

import { Colors } from "@theme/Colors";

type ButtonProps = {
    title: string;
};

export const Button: React.FC<ButtonProps> = ({ title }) => {
    return (
        <Background>
            <Text>{title}</Text>
        </Background>
    );
};

const Background = styled.View({
    margin: 12,
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
