import React from "react";
import { PressableProps } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";

import { Colors } from "@theme/Colors";

type CryptoCoinProps = {
    imageUrl?: string;
    name?: string;
    shortName?: string;
    price?: number;
    priceChange?: number;
    fav?: boolean;
    loggedIn?: boolean;
} & PressableProps;

export const CryptoCoin: React.FC<CryptoCoinProps> = ({ imageUrl, name, shortName, price, priceChange, fav, onPress, loggedIn }) => {
    return (
        <Container onPress={onPress}>
            <LeftContainer>
                <Image source={{ uri: imageUrl }} />
                <TitleContainer>
                    <Title>{name}</Title>
                    <Subtitle>{shortName!.toUpperCase()}</Subtitle>
                </TitleContainer>
            </LeftContainer>
            <RightContainer>
                <RightTitleContainer>
                    <Title>${price!.toLocaleString("en-US", { currency: "USD" })}</Title>
                    <PriceChangeText priceChange={priceChange}>{priceChange?.toFixed(2)}%</PriceChangeText>
                </RightTitleContainer>
                {loggedIn && fav && <Icon name="heart" color={Colors.cadetBlue} size={36} />}
                {loggedIn && !fav && <Icon name="heart-outline" color={Colors.cadetBlue} />}
            </RightContainer>
        </Container>
    );
};
const Image = styled.Image({
    height: 48,
    width: 48,
});

const Title = styled.Text({
    fontSize: 18,
    color: Colors.silverSand,
});

const PriceChangeText = styled.Text<CryptoCoinProps>(({ priceChange }) => ({
    marginTop: 4,
    fontSize: 14,
    color: priceChange! > 0 ? "#00ff00" : "#ff0000",
}));

const Subtitle = styled.Text({
    marginTop: 4,
    fontSize: 14,
    color: Colors.gray,
});

const Container = styled.Pressable({
    width: 358,
    paddingHorizontal: 16,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
});

const LeftContainer = styled.View({
    flexDirection: "row",
    alignItems: "center",
});

const RightContainer = styled.View({
    flexDirection: "row",
    alignItems: "center",
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
