import React from "react";
import { View } from "react-native";

import { TabHeader } from "@components/TabHeader";
import { Colors } from "@theme/Colors";
import { Tabs } from "@constants/Tabs";

export const AccountScreen = () => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: Colors.silverSand,
                flexDirection: "column",
            }}
        >
            <TabHeader title={Tabs.account} />
        </View>
    );
};
