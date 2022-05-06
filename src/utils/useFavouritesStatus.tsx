import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@stores/store";
import { addFav, removeFav } from "@services/UserServices";
import { fetchFavsAction, fetchMarketAction } from "@actions/CryptoActions";
import { MarketData } from "@constants/DataTypes";

export function useFavouriteStatus(fav: boolean, id: string) {
    const [isFav, setIsFav] = useState(fav);

    const user = useSelector((state: RootState) => state.user, shallowEqual);
    const crypto = useSelector((state: RootState) => state.crypto, shallowEqual);
    const error = useSelector((state: RootState) => state.error.error, shallowEqual);

    /*
        handle add favourite and remove favourite
    */
    async function setFav(value: boolean) {
        setIsFav(value);

        let coin = crypto.marketCoins.find((coin: MarketData) => coin.id === id);
        const index = crypto.marketCoins.indexOf(coin);
        coin = { ...coin, fav: value };

        let market: MarketData[] = [];
        let favs: MarketData[] = [];

        if (value) {
            await addFav(user.id, id);

            if (!error) {
                market = [coin, ...crypto.marketCoins.slice(0, index), ...crypto.marketCoins.slice(index + 1)];
                favs = [coin, ...crypto.favs];
                fetchMarketAction(market);
                fetchFavsAction(favs);
            }
        } else {
            await removeFav(user.id, id);
            if (!error) {
                favs = [...crypto.favs.slice(0, index), ...crypto.favs.slice(index + 1)];
                market = [...favs, coin, ...crypto.marketCoins.slice(favs.length + 1)];
                fetchMarketAction(market);
                fetchFavsAction(favs);
            }
        }
    }

    return [isFav, setFav] as const;
}
