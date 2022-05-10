import React, { useRef, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { RootState } from "@stores/store";
import { Coins } from "@constants/DataTypes";
import { Currency } from "@constants/currency";
import { addCoin, getOwnedCoins, setCoin } from "@services/UserServices";
import { OwnedCoin } from "@components/OwnedCoins";
import { FAB } from "react-native-paper";
import { NewOwnedCoinBottomModal } from "@components/NewOwnedCoinBottomModal";
import { EditOwnedCoinBottomModal } from "@components/EditOwnedCoinBottomModal";

/*
    contains the owned coins of the user
*/
export const UserLoggedIn = () => {
    const addCoinRef = useRef() as React.MutableRefObject<RBSheet>;
    const editCoinRef = useRef() as React.MutableRefObject<RBSheet>;

    const crypto = useSelector((state: RootState) => state.crypto, shallowEqual);
    const user = useSelector((state: RootState) => state.user, shallowEqual);

    const currencyData = Object.keys(Currency).map((key) => ({ id: key, name: key.toUpperCase() }));

    const [loading, setLoading] = useState(false);

    const [coinName, setCoinName] = useState("");
    const [holdings, setHoldings] = useState("");
    const [totalCost, setTotalCost] = useState("");
    const [currency, setCurrency] = useState("");

    const [selectedCoin, setSelectedCoin] = useState<Coins | null>(null);
    const [purchasedHoldings, setPurchasedHoldings] = useState("");
    const [purchasedTotalCost, setPurchasedTotalCost] = useState("");
    const [soldHoldings, setSoldHoldings] = useState("");
    const [soldTotalCost, setSoldTotalCost] = useState("");

    const [modalError, setModalError] = useState("");

    const fetchCoins = async () => {
        await getOwnedCoins(user.id);
    };

    const onRefresh = async () => {
        setLoading(true);
        await fetchCoins();
        setLoading(false);
    };

    const styles = StyleSheet.create({
        fab: {
            position: "absolute",
            margin: 16,
            right: 4,
            bottom: 0,
        },
    });

    const reset = () => {
        setCoinName("");
        setHoldings("");
        setTotalCost("");
        setCurrency("");
        setPurchasedHoldings("");
        setPurchasedTotalCost("");
        setSoldHoldings("");
        setSoldTotalCost("");
        setModalError("");
    };

    const percentage = (current: number, total: number) => {
        return (Number(current) / Number(total)) * 100 - 100;
    };

    return (
        <>
            {loading && <ActivityIndicator animating size="large" style={{ paddingTop: 16 }} />}

            <FlatList
                keyExtractor={(item) => item.id}
                data={user.isLoggedIn ? crypto.ownedCoins : []}
                refreshing={loading}
                onRefresh={() => onRefresh()}
                getItemLayout={(data, index) => ({ length: 72, offset: 72 * index, index })}
                renderItem={({ item }) => (
                    <OwnedCoin
                        id={item.id}
                        name={item.name}
                        shortName={item.symbol}
                        price={item.price}
                        currentPrice={item.current_price * item.holdings}
                        imageUrl={item.image}
                        currency={item.currency}
                        holdings={item.holdings}
                        percentage={percentage(item.current_price * item.holdings, item.price)}
                        onPress={() => {
                            setSelectedCoin(item);
                            editCoinRef.current!.open();
                        }}
                    />
                )}
            />
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => {
                    addCoinRef.current.open();
                }}
            />
            <NewOwnedCoinBottomModal
                reference={addCoinRef}
                setCoinName={setCoinName}
                setHoldings={setHoldings}
                setTotalCost={setTotalCost}
                setCurrency={setCurrency}
                data={crypto.coins}
                currency={currencyData}
                error={modalError}
                onSave={async () => {
                    if (coinName && holdings && totalCost && currency) {
                        await addCoin(user.id, coinName, Number(holdings), Number(totalCost), currency);
                        fetchCoins();
                        addCoinRef.current!.close();
                        reset();
                    } else setModalError("Missing attribute, please fill all the textinputs!");
                }}
                onCancel={() => {
                    reset();
                }}
            />
            <EditOwnedCoinBottomModal
                reference={editCoinRef}
                setPurchasedHoldings={setPurchasedHoldings}
                setPurchasedTotalCost={setPurchasedTotalCost}
                setSoldHoldings={setSoldHoldings}
                setSoldTotalCost={setSoldTotalCost}
                onSave={async () => {
                    await setCoin(selectedCoin!.id, purchasedHoldings, purchasedTotalCost, soldHoldings, soldTotalCost);
                    fetchCoins();
                    editCoinRef.current!.close();
                    reset();
                }}
                onCancel={() => {
                    reset();
                }}
            />
        </>
    );
};
