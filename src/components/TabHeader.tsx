import React from "react";
import styled from "styled-components/native";
import { Colors } from "@theme/Colors";

type TabHeaderProps = {
    title: string;
};

/*
    tabheader, used in every tab with different title
*/
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
    height: 50,
    borderWidth: 1,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderColor: Colors.gunmetal,
    alignItems: "center",
    justifyContent: "center",
});

const Text = styled.Text({
    color: Colors.silverSand,
    fontSize: 24,
});
