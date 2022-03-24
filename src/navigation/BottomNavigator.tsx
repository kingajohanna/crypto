import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

import { Tabs } from "@constants/Tabs";

import { AccountScreen } from "@screens/AccountScreen";
import { FavouriteScreen } from "@screens/FavouritesScreen";
import { MarketScreen } from "@screens/MarketScreen";
import { MyCoinsScreen } from "@screens/MyCoinsScreen";

import { Colors } from "@theme/Colors";

export const BottomNavigator = () => {
    const Tab = createMaterialBottomTabNavigator();

    return (
        <NavigationContainer>
            <SafeAreaProvider style={styles.background}>
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
            </SafeAreaProvider>
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
