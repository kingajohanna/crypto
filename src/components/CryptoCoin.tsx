import React, { memo } from "react";
import { PressableProps } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import FastImage from "react-native-fast-image";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@stores/store";
import { Colors } from "@theme/Colors";
import { useFavouriteStatus } from "@utils/useFavouritesStatus";

type CryptoCoinProps = {
    id: string;
    imageUrl: string;
    name: string;
    shortName: string;
    price: number;
    priceChange: number;
    isFavourite: boolean;
} & PressableProps;

/*
    use for flatlist in marketscreen and favourites screen
*/
const CryptoCoinComponent: React.FC<CryptoCoinProps> = ({ id, imageUrl, name, shortName, price, priceChange, isFavourite, onPress }) => {
    const user = useSelector((state: RootState) => state.user, shallowEqual);
    const [fav, setFav] = useFavouriteStatus(isFavourite, id);

    return (
        <Container onPress={onPress}>
            <LeftContainer>
                <FastImage
                    style={{ width: 48, height: 48 }}
                    source={{
                        uri: imageUrl,
                        priority: FastImage.priority.low,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
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
                {user.isLoggedIn && fav && <Icon name="heart" color={Colors.cadetBlue} size={36} onPress={() => setFav(!fav)} />}
                {user.isLoggedIn && !fav && <Icon name="heart-outline" color={Colors.cadetBlue} size={36} onPress={() => setFav(!fav)} />}
            </RightContainer>
        </Container>
    );
};

const Container = styled.Pressable({
    width: 370,
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
    alignItems: "flex-end",
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

const PriceChangeText = styled.Text<Partial<CryptoCoinProps>>(({ priceChange }) => ({
    marginTop: 4,
    fontSize: 14,
    color: priceChange! > 0 ? "#00ff00" : "#ff0000",
}));

const Subtitle = styled.Text({
    marginTop: 4,
    fontSize: 14,
    color: Colors.gray,
});

export const CryptoCoin = memo(CryptoCoinComponent);
