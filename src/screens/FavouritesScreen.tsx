import { TabHeader } from "@components/TabHeader";
import { Colors } from "@theme/Colors";
import { Tabs } from "@constants/Tabs";
import * as React from "react";
import { useState } from "react";
import { Button, Text, View } from "react-native";

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
        </View>
    );
};
