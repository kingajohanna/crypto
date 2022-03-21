import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import styled from "styled-components/native";
// @ts-ignore
import { ChartDot, ChartPath, ChartPathProvider, ChartYLabel } from "@rainbow-me/animated-charts";

import { Colors } from "@theme/Colors";

const { width: SIZE } = Dimensions.get("window");

type CryptoChartProps = {
    imageUrl?: string;
    name?: string;
    shortName?: string;
    price?: number;
    percentage?: number;
    sparkline?: any;
};

export const CryptoChart: React.FC<CryptoChartProps> = ({ imageUrl, name, shortName, price, percentage, sparkline }) => {
    const latestCurrentPrice = useSharedValue(price);
    const [chartReady, setChartReady] = useState(false);

    const priceChangeColor = percentage ? (percentage > 0 ? "#34C759" : "#FF3B30") : 0;

    useEffect(() => {
        latestCurrentPrice.value = price;

        setTimeout(() => {
            setChartReady(true);
        }, 0);
    }, [price]);

    const formatUSD = (value: any) => {
        "worklet";
        if (value === "") {
            const formattedValue = `$${latestCurrentPrice.value?.toLocaleString("en-US", { currency: "USD" })}`;
            return formattedValue;
        }

        const formattedValue = `$${parseFloat(value)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
        return formattedValue;
    };

    if (sparkline.length === 0) {
        return <Title>Loading...</Title>;
    }
    return (
        <ChartPathProvider data={{ points: sparkline, smoothingStrategy: "bezier" }}>
            <Container>
                <Container>
                    <UpperTitleContainer>
                        <UpperLeftTitleContainer>
                            <Image source={{ uri: imageUrl }} />
                            <Subtitle>
                                {name} ({shortName?.toUpperCase()})
                            </Subtitle>
                        </UpperLeftTitleContainer>
                        <Subtitle>7 day</Subtitle>
                    </UpperTitleContainer>
                    <LowerTitleContainer>
                        <ChartYLabel format={formatUSD} style={{ fontSize: 24, fontWeight: "bold" }} />
                        <Title percentage={percentage}>{percentage?.toFixed(2)}%</Title>
                    </LowerTitleContainer>
                </Container>
                {chartReady ? (
                    <ChartContainer>
                        <ChartPath height={SIZE / 2} stroke="black" width={SIZE} />
                        <ChartDot style={{ backgroundColor: "black" }} />
                    </ChartContainer>
                ) : null}
            </Container>
        </ChartPathProvider>
    );
};

const Container = styled.View({
    marginVertical: 16,
});

const UpperTitleContainer = styled.View({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
});

const LowerTitleContainer = styled.View({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
});

const UpperLeftTitleContainer = styled.View({
    flexDirection: "row",
    alignItems: "center",
});

const ChartContainer = styled.View({
    marginTop: 40,
});

const Image = styled.Image({
    width: 24,
    height: 24,
    marginRight: 4,
});

const Subtitle = styled.Text({
    fontSize: 14,
    color: Colors.silverSand,
});

const Title = styled.Text<CryptoChartProps>(({ percentage }) => ({
    fontSize: 18,
    color: percentage && percentage > 0 ? "#00ff00" : "#ff0000",
}));
