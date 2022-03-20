import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { MarketScreen } from "@screens/MarketScreen";
import { AccountScreen } from "@screens/AccountScreen";
import { FavouriteScreen } from "@screens/FavouritesScreen";
import { MyCoinsScreen } from "@screens/MyCoinsScreen";

import { Colors } from "@theme/Colors";
import Icon from "react-native-ionicons";
import { Tabs } from "@constants/Tabs";

export const BottomNavigator = () => {
    const Tab = createMaterialBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator activeColor={Colors.fluorescentBlue} inactiveColor={Colors.cadetBlue} initialRouteName={Tabs.market} shifting={true} barStyle={styles.tabBar}>
                <Tab.Screen
                    name={Tabs.account}
                    component={AccountScreen}
                    options={{
                        tabBarLabel: Tabs.account,
                        tabBarIcon: ({ color }) => <Icon name="person" size={24} color={color} />,
                    }}
                />
                <Tab.Screen
                    name={Tabs.mycoins}
                    component={MyCoinsScreen}
                    options={{
                        tabBarLabel: Tabs.mycoins,
                        tabBarIcon: ({ color }) => <Icon name="wallet" size={24} color={color} />,
                    }}
                />
                <Tab.Screen
                    name={Tabs.market}
                    component={MarketScreen}
                    options={{
                        tabBarLabel: Tabs.market,
                        tabBarIcon: ({ color }) => <Icon name="home" size={24} color={color} />,
                    }}
                />
                <Tab.Screen
                    name={Tabs.favourites}
                    component={FavouriteScreen}
                    options={{
                        tabBarLabel: Tabs.favourites,
                        tabBarIcon: ({ color }) => <Icon name="ios-star" size={24} color={color} />,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: Colors.richBlack,
    },
    tabBar: {
        borderWidth: 0.5,
        borderBottomWidth: 1,
        backgroundColor: Colors.gunmetal,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderColor: "transparent",
        overflow: "hidden",
    },
});
