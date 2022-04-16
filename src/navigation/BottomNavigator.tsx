import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

import { Tabs } from "@constants/Tabs";

import { AccountScreen } from "@screens/AccountScreen";
import { FavouriteScreen } from "@screens/FavouritesScreen";
import { MarketScreen } from "@screens/MarketScreen";
import { MyCoinsScreen } from "@screens/MyCoinsScreen";

import { Colors } from "@theme/Colors";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@stores/store";
import { getFavsMarket, getMarketData } from "@services/CryptoServices";
import { getOwnedCoins } from "@services/UserServices";

export const BottomNavigator = () => {
    const user = useSelector((state: RootState) => state.user, shallowEqual);
    const error = useSelector((state: RootState) => state.error, shallowEqual);

    const fetchMarketData = async () => {
        if (user.isLoggedIn) {
            await getMarketData(user.id);
            await getFavsMarket(user.id);
            await getOwnedCoins(user.id);
        } else await getMarketData();
    };

    useEffect(() => {
        if (error.error !== "") console.log(error.error);
    }, [error.error]);

    useEffect(() => {
        fetchMarketData();
    }, [user.isLoggedIn]);

    const Tab = createMaterialBottomTabNavigator();

    return (
        <SafeAreaProvider style={styles.background}>
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
        </SafeAreaProvider>
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
