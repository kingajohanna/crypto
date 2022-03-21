import * as React from "react";
import { View } from "react-native";

import { Colors } from "@theme/Colors";
import { Tabs } from "@constants/Tabs";
import { TabHeader } from "@components/TabHeader";
import { AccountButton } from "@components/AccountButton";

export const FavouriteScreen = () => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: Colors.richBlack,
            }}
        >
            <TabHeader title={Tabs.favourites} />
            <AccountButton.Email />
            <AccountButton.Apple />
            <AccountButton.Facebook />
            <AccountButton.Google />
            <AccountButton.Logout />
            <AccountButton.Delete />
        </View>
    );
};
