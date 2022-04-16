import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@stores/store";
import { addFav, removeFav } from "@services/UserServices";
import { fetchCoinsAction, fetchFavsAction, fetchMarketAction } from "@stores/Actions";
import { MarketData } from "@constants/DataTypes";

export function useFavouriteStatus(fav: boolean, id: string, index: number) {
    const [isFav, setIsFav] = useState(fav);

    const user = useSelector((state: RootState) => state.user, shallowEqual);
    const crypto = useSelector((state: RootState) => state.crypto, shallowEqual);
    const error = useSelector((state: RootState) => state.error.error, shallowEqual);

    async function setFav(value: boolean) {
        setIsFav(value);
        const coin = { ...crypto.marketCoins[index], fav: value };

        let market: MarketData[] = [];
        let favs: MarketData[] = [];

        if (value) {
            await addFav(user.id, id);
            market = [coin, ...crypto.marketCoins.slice(0, index), ...crypto.marketCoins.slice(index + 1)];
            favs = [coin, ...crypto.favs];
        } else {
            await removeFav(user.id, id);
            favs = [...crypto.favs.slice(0, index), ...crypto.favs.slice(index + 1)];

            market = [...favs, coin, ...crypto.marketCoins.slice(favs.length + 1)];
        }
        if (error === "") {
            fetchMarketAction([]);
            fetchMarketAction(market);
            fetchFavsAction(favs);
        } else {
            setIsFav(!value);
        }
    }

    return [isFav, setFav] as const;
}
