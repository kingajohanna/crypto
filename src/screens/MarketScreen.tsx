import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@stores/store";
import { MarketData } from "@constants/DataTypes";
import { Tabs } from "@constants/Tabs";
import { CryptoCoin } from "@components/CryptoCoin";
import { ScreenBackground } from "@components/ScreenBackground";
import { SelectedCoinGraph } from "@components/SelectedCoinGraph";
import { Searchbar } from "@components/SearchBar";
import { ErrorComponent } from "@components/ErrorComponent";
import { fetchData } from "@utils/FetchData";

export const MarketScreen = () => {
    const crypto = useSelector((state: RootState) => state.crypto, shallowEqual);
    const user = useSelector((state: RootState) => state.user, shallowEqual);

    const [selectedCoinData, setSelectedCoinData] = useState<MarketData | null>(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(crypto.marketCoins);
    const [text, setText] = useState("");

    const refRBSheet = useRef() as React.MutableRefObject<RBSheet>;

    const openModal = (item: MarketData) => {
        setSelectedCoinData(item);
        refRBSheet.current!.open();
    };

    const onRefresh = async () => {
        setLoading(true);
        await fetchData(user);
        setLoading(false);
    };

    useEffect(() => {
        setData(crypto.marketCoins);
    }, [crypto.marketCoins]);

    const searchData = (text: string) => {
        const filterdData = text
            ? crypto.marketCoins.filter((item: MarketData) => {
                  const itemData = item.name.toUpperCase();
                  const textData = text.toUpperCase();
                  return itemData.includes(textData);
              })
            : crypto.marketCoins;
        setData(filterdData);
        setText(text);
    };

    return (
        <ScreenBackground title={Tabs.market}>
            {crypto.marketCoins ? (
                <>
                    <Searchbar onChangeText={(text: string) => searchData(text)} value={text} placeholder="Search here..." />
                    {loading && <ActivityIndicator animating size="large" style={{ paddingTop: 16 }} />}
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
                <ErrorComponent onPress={() => fetchData(user)} />
            )}
        </ScreenBackground>
    );
};
