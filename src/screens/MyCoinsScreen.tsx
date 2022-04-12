import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Button, FAB } from "react-native-paper";

import { Tabs } from "@constants/Tabs";

import { ScreenBackground } from "@components/ScreenBackground";

import RBSheet from "react-native-raw-bottom-sheet";
import { NewOwnedCoinBottomModal } from "@components/NewOwnedCoinBottomModal";
import { getCoins } from "@services/CryptoServices";
import { useSelector } from "react-redux";
import { RootState } from "@stores/store";
import { addCoin, getOwnedCoins } from "@services/UserServices";
import { OwnedCoin } from "@components/OwnedCoins";
import { Currency } from "@constants/currency";

export const MyCoinsScreen = () => {
    const addCoinRef = useRef() as React.MutableRefObject<RBSheet>;
    const editCoinRef = useRef() as React.MutableRefObject<RBSheet>;

    const crypto = useSelector((state: RootState) => state.crypto);
    const user = useSelector((state: RootState) => state.user);

    const [loading, setLoading] = useState(false);

    const fetchCoins = async () => {
        await getOwnedCoins(user.id);
    };

    useEffect(() => {
        fetchCoins();
    }, [user.isLoggedIn]);

    const onRefresh = async () => {
        await fetchCoins();
    };

    const [coinName, setCoinName] = React.useState("");
    const [holdings, setHoldings] = React.useState("");
    const [totalCost, setTotalCost] = React.useState("");
    const [currency, setCurrency] = React.useState("");

    const currencyData = Object.keys(Currency).map((key) => ({ id: key, name: key.toUpperCase() }));

    const styles = StyleSheet.create({
        fab: {
            position: "absolute",
            margin: 16,
            right: 4,
            bottom: 0,
        },
    });

    const percentage = (current: number, total: number) => {
        return (Number(current) / Number(total)) * 100 - 100;
    };

    return (
        <ScreenBackground title={Tabs.mycoins}>
            <FlatList
                keyExtractor={(item) => item.id}
                data={crypto.ownedCoins}
                refreshing={loading}
                initialNumToRender={3}
                onRefresh={() => onRefresh()}
                getItemLayout={(data, index) => ({ length: 72, offset: 72 * index, index })}
                renderItem={({ item }) => (
                    <OwnedCoin
                        id={item.id}
                        name={item.name}
                        shortName={item.symbol}
                        price={item.price}
                        currentPrice={item.current_price}
                        imageUrl={item.image}
                        currency={item.currency}
                        holdings={item.holdings}
                        percentage={percentage(item.current_price, item.price)}
                        onPress={() => editCoinRef.current!.open()}
                    />
                )}
            />
            <FAB style={styles.fab} icon="plus" onPress={() => addCoinRef.current!.open()} />
            <NewOwnedCoinBottomModal
                reference={addCoinRef}
                setCoinName={setCoinName}
                setHoldings={setHoldings}
                setTotalCost={setTotalCost}
                setCurrency={setCurrency}
                data={crypto.coins}
                currency={currencyData}
                onSave={() => {
                    addCoin(user.id, coinName, Number(holdings), Number(totalCost), currency);
                    fetchCoins();
                    addCoinRef.current!.close();
                }}
                onCancel={() => addCoinRef.current!.close()}
            />
        </ScreenBackground>
    );
};
