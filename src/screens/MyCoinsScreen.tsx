import * as React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

import { Tabs } from "@constants/Tabs";

import { Button } from "@components/Button";
import { ScreenBackground } from "@components/ScreenBackground";

export const MyCoinsScreen = () => {
    const styles = StyleSheet.create({
        fab: {
            position: "absolute",
            margin: 16,
            right: 4,
            bottom: 0,
        },
    });

    return (
        <ScreenBackground title={Tabs.mycoins}>
            <FAB style={styles.fab} icon="plus" onPress={() => {}} />
        </ScreenBackground>
    );
};
