import React, { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";

import { Colors } from "@theme/Colors";
import { Tabs } from "@constants/Tabs";
import { CryptoCoin } from "@components/CryptoCoin";
import { getMarketData } from "@services/CryptoService";

import { MarketData } from "@constants/MarketData";
import { ScreenBackground } from "@components/ScreenBackground";
import { CryptoChart } from "@components/CryptoChart";
import { LineChart } from "react-native-wagmi-charts";

export const MarketScreen = () => {
    let initialValue: MarketData[] = [];
    const [data, setData] = useState(initialValue);

    useEffect(() => {
        const fetchMarketData = async () => {
            const marketData = await getMarketData();
            // @ts-ignore
            setData(marketData);
        };

        fetchMarketData();
        console.log("data", data.length);
    }, []);

    return (
        <ScreenBackground title={Tabs.market}>
            {data.length === (0 || undefined) && <Text style={{ color: "#ffffff" }}>Error</Text>}
            <FlatList
                keyExtractor={(item) => item.id}
                data={data}
                renderItem={({ item }) => (
                    <CryptoCoin
                        fav
                        onPress={() => console.log(item)}
                        name={item.name}
                        shortName={item.symbol}
                        price={item.current_price}
                        percentage={item.price_change_percentage_7d_in_currency}
                        imageUrl={item.image}
                    />
                )}
            />
            <LineChart.Provider data={data}>
                <LineChart>
                    <LineChart.Path />
                </LineChart>
            </LineChart.Provider>
        </ScreenBackground>
    );
};
