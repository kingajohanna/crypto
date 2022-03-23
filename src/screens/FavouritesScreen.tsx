import * as React from "react";

import { Tabs } from "@constants/Tabs";
import { ScreenBackground } from "@components/ScreenBackground";
import { CryptoChart } from "@components/CryptoChart";

export const FavouriteScreen = () => {
    return (
        <ScreenBackground title={Tabs.favourites}>
            <CryptoChart />
        </ScreenBackground>
    );
};
