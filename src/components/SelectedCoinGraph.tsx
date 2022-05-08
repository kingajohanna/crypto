import React from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { CryptoChart } from "@components/CryptoChart";
import { MarketData } from "@constants/DataTypes";
import { Colors, hexToRGBA } from "@theme/Colors";
import { getModalHeight } from "@utils/BottomModalHeight";

type SelectedProps = {
    selectedCoinData?: MarketData;
    reference: React.MutableRefObject<RBSheet>;
};

/*
    bottom modal for selected coin details in market screen and favourites screen
*/
export const SelectedCoinGraph: React.FC<SelectedProps> = ({ selectedCoinData, reference }) => {
    return (
        <RBSheet
            ref={reference}
            closeOnPressMask={true}
            closeDuration={180}
            openDuration={180}
            customStyles={{
                container: {
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    backgroundColor: Colors.gunmetal,
                },
                wrapper: {
                    backgroundColor: hexToRGBA(Colors.richBlack, 0.5),
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
