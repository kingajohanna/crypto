import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Colors } from "@theme/Colors";
import { FAB } from "react-native-paper";
import { TabHeader } from "@components/TabHeader";
import { Tabs } from "@constants/Tabs";
import { Button } from "@components/Button";

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
        <View
            style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: Colors.richBlack,
            }}
        >
            <TabHeader title={Tabs.mycoins} />
            <Button title="Save" />
            <Button title="Cancel" />
            <FAB style={styles.fab} icon="plus" onPress={() => {}} />
        </View>
    );
};
