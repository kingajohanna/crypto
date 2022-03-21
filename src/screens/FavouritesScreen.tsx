import * as React from "react";
import { View } from "react-native";

import { Colors } from "@theme/Colors";
import { Tabs } from "@constants/Tabs";
import { TabHeader } from "@components/TabHeader";

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
