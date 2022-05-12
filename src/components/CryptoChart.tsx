import React from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-wagmi-charts";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Colors } from "@theme/Colors";

const { height: SIZE } = Dimensions.get("window");

type CryptoChartProps = {
    imageUrl?: string;
    name?: string;
    shortName?: string;
    price?: number;
    priceChange?: number;
    sparkline?: any;
};
/**
 *    chart about the last 7 day price changes
 */
export const CryptoChart: React.FC<CryptoChartProps> = ({ imageUrl, name, shortName, price, priceChange, sparkline }) => {
    return (
        <Container>
            <UpperContainer>
                <CoinContainer>
                    <Image source={{ uri: imageUrl }} />
                    <Text>
                        {name} ({shortName?.toUpperCase()})
                    </Text>
                </CoinContainer>
                <Text>last 7 days</Text>
            </UpperContainer>
            <LowerContainer>
                <Price>${price?.toLocaleString("en-US")}</Price>
                <PriceChangeText priceChange={priceChange}>{priceChange?.toFixed(2)}%</PriceChangeText>
            </LowerContainer>
            <GestureHandlerRootView>
                <LineChart.Provider data={sparkline.price}>
                    <LineChart.PriceText
                        format={({ formatted }) => {
                            "worklet";
                            if (formatted) {
                                return `$${formatted}`;
                            }
                            return "";
                        }}
                        style={{ color: Colors.silverSand }}
                    />
                    <LineChart.DatetimeText style={{ color: Colors.silverSand }} />
                    <LineChart height={SIZE * 0.3}>
                        <LineChart.Path color={Colors.cadetBlue} />
                        <LineChart.CursorCrosshair color={Colors.fluorescentBlue} />
                    </LineChart>
                </LineChart.Provider>
            </GestureHandlerRootView>
        </Container>
    );
};

const Container = styled.View({
    padding: 16,
    flexDirection: "column",
});

const UpperContainer = styled.View({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
});

const LowerContainer = styled.View({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
});

const CoinContainer = styled.View({
    flexDirection: "row",
    alignItems: "center",
});

const Image = styled.Image({
    width: 24,
    height: 24,
    marginRight: 8,
});

const Text = styled.Text({
    fontSize: 14,
    color: Colors.silverSand,
});

const Price = styled.Text({
    fontSize: 24,
    color: Colors.silverSand,
    fontWeight: "bold",
});

const PriceChangeText = styled.Text<CryptoChartProps>(({ priceChange }) => ({
    fontSize: 18,
    color: priceChange! > 0 ? "#00ff00" : "#ff0000",
}));
