import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@stores/store";
import { getFavsMarket, getMarketData } from "@services/CryptoServices";
import { MarketData } from "@constants/DataTypes";
import { Tabs } from "@constants/Tabs";
import { CryptoCoin } from "@components/CryptoCoin";
import { ScreenBackground } from "@components/ScreenBackground";
import { SelectedCoinGraph } from "@components/SelectedCoinGraph";
import { Searchbar } from "@components/SearchBar";
import { ErrorComponent } from "@components/ErrorComponent";

export const MarketScreen = () => {
    const crypto = useSelector((state: RootState) => state.crypto, shallowEqual);
    const user = useSelector((state: RootState) => state.user, shallowEqual);

    const [selectedCoinData, setSelectedCoinData] = useState<MarketData | null>(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(crypto.marketCoins);
    const [text, setText] = useState("");

    const refRBSheet = useRef() as React.MutableRefObject<RBSheet>;

    const fetchMarketData = async () => {
        if (user.isLoggedIn) {
            await getMarketData(user.id);
            await getFavsMarket(user.id);
        } else await getMarketData();

        setLoading(false);
    };

    const openModal = (item: MarketData) => {
        setSelectedCoinData(item);
        refRBSheet.current!.open();
    };

    const onRefresh = async () => {
        setLoading(true);
        await fetchMarketData();
    };

    useEffect(() => {
        setData(crypto.marketCoins);
    }, [crypto.marketCoins]);

    const searchData = (text: string) => {
        const filterdData = text
            ? data.filter((item: MarketData) => {
                  const itemData = item.name.toUpperCase();
                  const textData = text.toUpperCase();
                  return itemData.indexOf(textData) > -1;
              })
            : crypto.marketCoins;

        setData(filterdData);
        setText(text);
    };

    return (
        <ScreenBackground title={Tabs.market}>
            {loading && <ActivityIndicator animating size="large" style={{ paddingTop: 16 }} />}

            {crypto.marketCoins ? (
                <>
                    <Searchbar onChangeText={(text) => searchData(text)} value={text} placeholder="Search here..." />
                    <FlatList
                        keyExtractor={(item) => item.id}
                        data={data}
                        onRefresh={() => onRefresh()}
                        refreshing={loading}
                        initialNumToRender={150}
                        getItemLayout={(data, index) => ({ length: 72, offset: 72 * index, index })}
                        renderItem={({ item }) => (
                            <CryptoCoin
                                id={item.id}
                                isFavourite={item.fav}
                                onPress={() => openModal(item)}
                                name={item.name}
                                shortName={item.symbol}
                                price={item.current_price}
                                priceChange={item.price_change_percentage_7d_in_currency}
                                imageUrl={item.image}
                            />
                        )}
                    />

                    <SelectedCoinGraph selectedCoinData={selectedCoinData!} reference={refRBSheet} />
                </>
            ) : (
                <ErrorComponent onPress={() => fetchMarketData()} />
            )}
        </ScreenBackground>
    );
};
