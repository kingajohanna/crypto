import React, { memo, useState } from "react";
import { PressableProps } from "react-native";
import styled from "styled-components/native";

import { Colors } from "@theme/Colors";
import FastImage from "react-native-fast-image";
import { Currency } from "@constants/currency";

type OwnedCoinProp = {
    id: string;
    imageUrl: string;
    name: string;
    shortName: string;
    currency: string;
    price: number;
    currentPrice: number;
    percentage: number;
    holdings: number;
} & PressableProps;

/**
 *   base component for owned coins, used in mycoins screen
 */
const OwnedCoinsComponent: React.FC<OwnedCoinProp> = (props) => {
    return (
        <Container onPress={props.onPress}>
            <ColumnContainer>
                <LeftContainer>
                    <FastImage
                        style={{ width: 48, height: 48 }}
                        source={{
                            uri: props.imageUrl,
                            priority: FastImage.priority.low,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <TitleContainer>
                        <Title>{props.name}</Title>
                        <Subtitle>{props.shortName?.toUpperCase()}</Subtitle>
                    </TitleContainer>
                </LeftContainer>
                <TitleColored>Total price</TitleColored>
                <Subtitle>{formatPrice(props.price, props.currency)}</Subtitle>
            </ColumnContainer>
            <ColumnContainer>
                <RightTitleContainer>
                    <TitleColored>Total holdings</TitleColored>
                    <Subtitle>{props.holdings}</Subtitle>
                    <TitleColored>Current price</TitleColored>
                    <Subtitle>{formatPrice(props.currentPrice, props.currency)}</Subtitle>
                    <PriceChangeText percentage={props.percentage}>{props.percentage.toFixed(2)}%</PriceChangeText>
                </RightTitleContainer>
            </ColumnContainer>
        </Container>
    );
};

const formatPrice = (price: number, currency: string) => {
    switch (currency) {
        case Currency.eur:
            return new Intl.NumberFormat("de", { style: "currency", currency: currency }).format(price);
        case Currency.usd:
            return new Intl.NumberFormat("en", { style: "currency", currency: currency }).format(price);
        case Currency.huf:
        default:
            return new Intl.NumberFormat("hu", { style: "currency", currency: currency }).format(price);
    }
};

const Container = styled.Pressable({
    width: 342,
    height: 120,
    paddingHorizontal: 16,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: Colors.gunmetal,
});

const LeftContainer = styled.View({
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 14,
});

const ColumnContainer = styled.View({
    flexDirection: "column",
});

const TitleContainer = styled.View({
    marginLeft: 8,
    marginRight: 8,
});

const RightTitleContainer = styled.View({
    marginLeft: 8,
    marginRight: 8,
    alignItems: "flex-end",
});

const Image = styled.Image({
    height: 48,
    width: 48,
});

const Title = styled.Text({
    fontSize: 18,
    color: Colors.silverSand,
});

const TitleColored = styled.Text({
    fontSize: 14,
    color: Colors.cadetBlue,
});

const PriceChangeText = styled.Text<Partial<OwnedCoinProp>>(({ percentage }) => ({
    marginTop: 4,
    fontSize: 14,
    color: percentage! > 0 ? "#00ff00" : "#ff0000",
}));

const Subtitle = styled.Text({
    marginTop: 4,
    fontSize: 16,
    color: Colors.silverSand,
});

export const OwnedCoin = memo(OwnedCoinsComponent);
