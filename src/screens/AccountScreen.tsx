import * as React from "react";
import { useState } from "react";
import { Text, View } from "react-native";
// @ts-ignore
import SearchableDropdown from "react-native-searchable-dropdown";

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
