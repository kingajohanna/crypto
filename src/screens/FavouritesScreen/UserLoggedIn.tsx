import React, { useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { shallowEqual, useSelector } from "react-redux";
import RBSheet from "react-native-raw-bottom-sheet";
import { RootState } from "@stores/store";
import { MarketData } from "@constants/DataTypes";
import { getFavsMarket, getMarketData } from "@services/CryptoServices";
import { CryptoCoin } from "@components/CryptoCoin";
import { SelectedCoinGraph } from "@components/SelectedCoinGraph";

/**
 *    renders users favourite coins in favourites screen when the user is logged in
 */
export const UserLoggedIn = () => {
    const crypto = useSelector((state: RootState) => state.crypto, shallowEqual);
    const user = useSelector((state: RootState) => state.user, shallowEqual);

    const [loading, setLoading] = useState(false);

    const [selectedCoinData, setSelectedCoinData] = useState<MarketData | null>(null);

    const refRBSheet = React.useRef() as React.MutableRefObject<RBSheet>;

    const fetchFavData = async () => {
        await getFavsMarket(user.id);
        await getMarketData(user.id);
        setLoading(false);
    };

    const openModal = (item: MarketData) => {
        setSelectedCoinData(item);
        refRBSheet.current!.open();
    };

    const onRefresh = async () => {
        setLoading(true);
        await fetchFavData();
    };

    return (
        <>
            {loading && <ActivityIndicator animating size="large" style={{ paddingTop: 16 }} />}
            <FlatList
                keyExtractor={(item) => item.id}
                data={user.isLoggedIn ? crypto.favs : []}
                initialNumToRender={100}
                onRefresh={() => onRefresh()}
                refreshing={loading}
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
    );
};
