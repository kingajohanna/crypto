import React, { Children } from "react";
import styled from "styled-components/native";

import { Colors } from "@theme/Colors";
import { TabHeader } from "@components/TabHeader";

type ScreenBackgroundProps = {
    title: string;
};

export const ScreenBackground: React.FC<ScreenBackgroundProps> = ({ title, children }) => {
    return (
        <Background>
            <TabHeader title={title} />
            {children}
        </Background>
    );
};

const Background = styled.View({
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.richBlack,
    flexDirection: "column",
});
