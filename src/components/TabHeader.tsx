import React from "react";
// @ts-ignore
import styled from "styled-components/native";

import { Colors } from "@theme/Colors";

type TabHeaderProps = {
    title: string;
};

export const TabHeader: React.FC<TabHeaderProps> = ({ title }) => {
    return (
        <Background>
            <Text>{title}</Text>
        </Background>
    );
};

const Background = styled.View({
    backgroundColor: Colors.gunmetal,
    width: "100%",
    height: 93,
    borderWidth: 1,
    borderBottomWidth: 0.5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingTop: 44,
    alignItems: "center",
    justifyContent: "center",
});

const Text = styled.Text({
    color: Colors.silverSand,
    fontSize: 24,
});
