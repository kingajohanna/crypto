import React from "react";
import styled from "styled-components/native";

import { TabHeader } from "@components/TabHeader";

import { Colors } from "@theme/Colors";
import { SafeAreaView } from "react-native";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@stores/store";
import { ErrorComponent } from "@components/ErrorComponent";
import { fetchData } from "@utils/FetchData";

type ScreenBackgroundProps = {
    title: string;
};

export const ScreenBackground: React.FC<ScreenBackgroundProps> = ({ title, children }) => {
    const user = useSelector((state: RootState) => state.user, shallowEqual);
    const error = useSelector((state: RootState) => state.error.error, shallowEqual);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.gunmetal }}>
            <Background>
                <TabHeader title={title} />
                {error ? <ErrorComponent onPress={() => fetchData(user)} /> : <>{children}</>}
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
