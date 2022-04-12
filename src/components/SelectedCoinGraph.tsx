import { CryptoChart } from "@components/CryptoChart";
import { MarketData } from "@constants/DataTypes";
import { Colors } from "@theme/Colors";
import React from "react";
import { Dimensions } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

const { height: SIZE } = Dimensions.get("window");

type SelectedProps = {
    selectedCoinData?: MarketData;
    reference: React.MutableRefObject<RBSheet>;
};

export const SelectedCoinGraph: React.FC<SelectedProps> = ({ selectedCoinData, reference }) => {
    return (
        <RBSheet
            ref={reference}
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
    );
};
