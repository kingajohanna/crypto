import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, StyleSheet } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

import { getMarketData } from "@services/CryptoService";

import { MarketData } from "@constants/MarketData";
import { Tabs } from "@constants/Tabs";

import { CryptoChart } from "@components/CryptoChart";
import { CryptoCoin } from "@components/CryptoCoin";
import { ScreenBackground } from "@components/ScreenBackground";

import { Colors } from "@theme/Colors";

const { height: SIZE } = Dimensions.get("window");

export const MarketScreen = () => {
    const [selectedCoinData, setSelectedCoinData] = useState<MarketData | null>(null);
    const [data, setData] = useState<MarketData[] | null>(null);
    const [loading, setLoading] = useState(false);

    const refRBSheet = useRef() as React.MutableRefObject<RBSheet>;

    const fetchMarketData = async () => {
        setLoading(true);
        const marketData = await getMarketData();
        if (marketData) {
            setLoading(false);
            setData(marketData);
        }
    };

    useEffect(() => {
        fetchMarketData();
    }, []);

    const openModal = (item: MarketData) => {
        setSelectedCoinData(item);
        refRBSheet.current!.open();
    };

    const onRefresh = () => {
        setLoading(true);
        fetchMarketData();
    };

    return (
        <ScreenBackground title={Tabs.market}>
            {loading && <ActivityIndicator animating size="large" style={{ paddingTop: 16 }} />}

            <FlatList
                keyExtractor={(item) => item.id}
                data={data}
                onRefresh={() => onRefresh()}
                refreshing={loading}
                renderItem={({ item }) => (
                    <CryptoCoin
                        fav
                        onPress={() => openModal(item)}
                        name={item.name}
                        shortName={item.symbol}
                        price={item.current_price}
                        priceChange={item.price_change_percentage_7d_in_currency}
                        imageUrl={item.image}
                    />
                )}
            />
            <RBSheet
                ref={refRBSheet}
                closeOnPressMask={true}
                closeDuration={180}
                openDuration={180}
                height={SIZE * 0.5}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                        backgroundColor: Colors.gunmetal,
                    },
                    wrapper: {
                        backgroundColor: "transparent",
                    },
                    draggableIcon: {
                        backgroundColor: Colors.cadetBlue,
                    },
                }}
            >
                {selectedCoinData && (
                    <CryptoChart
                        imageUrl={selectedCoinData.image}
                        name={selectedCoinData.name}
                        shortName={selectedCoinData.symbol}
                        price={selectedCoinData.current_price}
                        priceChange={selectedCoinData.price_change_percentage_7d_in_currency}
                        sparkline={selectedCoinData.sparkline_in_7d}
                    />
                )}
            </RBSheet>
        </ScreenBackground>
    );
};
