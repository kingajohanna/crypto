import * as React from "react";
import { useState } from "react";
import { View } from "react-native";
import { Colors } from "@theme/Colors";
import { TabHeader } from "@components/TabHeader";
import { Tabs } from "@constants/Tabs";
import { AccountButton } from "@components/AccountButton";

export const MarketScreen = () => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: Colors.richBlack,
                flexDirection: "column",
            }}
        >
            <TabHeader title={Tabs.market} />
            <AccountButton.Email />
            <AccountButton.Apple />
            <AccountButton.Facebook />
            <AccountButton.Google />
            <AccountButton.Logout />
            <AccountButton.Delete />
        </View>
    );
};
