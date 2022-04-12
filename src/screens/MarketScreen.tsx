import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

import { useSelector } from "react-redux";
import { RootState } from "@stores/store";

import { getCoins, getFavsMarket, getMarketData } from "@services/CryptoServices";
import { addFav, removeFav } from "@services/UserServices";

import { MarketData } from "@constants/DataTypes";
import { Tabs } from "@constants/Tabs";

import { CryptoCoin } from "@components/CryptoCoin";
import { ScreenBackground } from "@components/ScreenBackground";
import { SelectedCoinGraph } from "@components/SelectedCoinGraph";

export const MarketScreen = () => {
    const user = useSelector((state: RootState) => state.user);
    const crypto = useSelector((state: RootState) => state.crypto);

    const [selectedCoinData, setSelectedCoinData] = useState<MarketData | null>(null);
    const [loading, setLoading] = useState(false);

    const refRBSheet = useRef() as React.MutableRefObject<RBSheet>;

    const fetchMarketData = async () => {
        if (user.isLoggedIn) {
            await getMarketData(user.id);
            await getFavsMarket(user.id);
        } else await getMarketData();

        setLoading(false);
    };

    useEffect(() => {
        fetchMarketData();
    }, [user.isLoggedIn]);

    const openModal = (item: MarketData) => {
        setSelectedCoinData(item);
        refRBSheet.current!.open();
    };

    const onRefresh = async () => {
        setLoading(true);
        await fetchMarketData();
    };

    const removeFavPress = async (id: string) => {
        await removeFav(user.id, id);
        fetchMarketData();
    };

    const addFavPress = async (id: string) => {
        await addFav(user.id, id);
        fetchMarketData();
    };

    return (
        <ScreenBackground title={Tabs.market}>
            {loading && <ActivityIndicator animating size="large" style={{ paddingTop: 16 }} />}

            <FlatList
                keyExtractor={(item) => item.id}
                data={crypto.marketCoins}
                onRefresh={() => onRefresh()}
                refreshing={loading}
                initialNumToRender={100}
                getItemLayout={(data, index) => ({ length: 72, offset: 72 * index, index })}
                renderItem={({ item }) => (
                    <CryptoCoin
                        id={item.id}
                        isFavourite={item.fav || false}
                        onPress={() => openModal(item)}
                        name={item.name}
                        shortName={item.symbol}
                        price={item.current_price}
                        priceChange={item.price_change_percentage_7d_in_currency}
                        imageUrl={item.image}
                        favAdd={() => addFavPress(item.id)}
                        favRemove={() => removeFavPress(item.id)}
                    />
                )}
            />

            <SelectedCoinGraph selectedCoinData={selectedCoinData!} reference={refRBSheet} />
        </ScreenBackground>
    );
};
