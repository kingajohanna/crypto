import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

import { useSelector } from "react-redux";
import { RootState } from "@stores/store";

import { removeFav } from "@services/UserServices";
import { getFavsMarket, getMarketData } from "@services/CryptoServices";

import { Tabs } from "@constants/Tabs";
import { MarketData } from "@constants/DataTypes";

import { ScreenBackground } from "@components/ScreenBackground";
import { CryptoCoin } from "@components/CryptoCoin";
import { SelectedCoinGraph } from "@components/SelectedCoinGraph";

export const FavouriteScreen = () => {
    const user = useSelector((state: RootState) => state.user);
    const crypto = useSelector((state: RootState) => state.crypto);

    const [selectedCoinData, setSelectedCoinData] = useState<MarketData | null>(null);

    const refRBSheet = React.useRef() as React.MutableRefObject<RBSheet>;

    const fetchFavData = async () => {
        if (user.isLoggedIn) {
            await getFavsMarket(user.id);
            await getMarketData(user.id);
        }
    };

    useEffect(() => {
        fetchFavData();
    }, [user.isLoggedIn]);

    const openModal = (item: MarketData) => {
        setSelectedCoinData(item);
        refRBSheet.current!.open();
    };

    const removeFavPress = async (id: string) => {
        await removeFav(user.id, id);
        fetchFavData();
    };

    return (
        <ScreenBackground title={Tabs.favourites}>
            <FlatList
                keyExtractor={(item) => item.id}
                data={user.isLoggedIn ? crypto.favs : []}
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
                        favAdd={() => {}}
                        favRemove={() => removeFavPress(item.id)}
                    />
                )}
            />

            <SelectedCoinGraph selectedCoinData={selectedCoinData!} reference={refRBSheet} />
        </ScreenBackground>
    );
};
