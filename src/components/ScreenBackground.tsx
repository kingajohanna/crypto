import React from "react";
import styled from "styled-components/native";

import { TabHeader } from "@components/TabHeader";

import { Colors } from "@theme/Colors";
import { SafeAreaView } from "react-native";

type ScreenBackgroundProps = {
    title: string;
};

export const ScreenBackground: React.FC<ScreenBackgroundProps> = ({ title, children }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.gunmetal }}>
            <Background>
                <TabHeader title={title} />
                {children}
            </Background>
        </SafeAreaView>
    );
};

const Background = styled.View({
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.richBlack,
    flexDirection: "column",
});
