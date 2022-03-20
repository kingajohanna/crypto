import * as React from "react";
import { Text, View } from "react-native";

import { BottomNavigator } from "@src/navigation/BottomNavigator";

export const AccountScreen = () => {
    return (
        <View>
            <Text>Account</Text>
            <BottomNavigator />
        </View>
    );
};
