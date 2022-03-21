import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import { Colors } from "@theme/Colors";
import { Tabs } from "@constants/Tabs";
import { TabHeader } from "@components/TabHeader";
import { CryptoCoin } from "@components/CryptoCoin";
import { getMarketData } from "@services/CryptoService";

import { MarketData } from "@constants/MarketData";

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
    }, []);

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
        </View>
    );
};
