import { User } from "@constants/DataTypes";
import { getFavsMarket, getMarketData } from "@services/CryptoServices";
import { getOwnedCoins } from "@services/UserServices";

export const fetchData = async (user: User) => {
    if (user.isLoggedIn) {
        await getMarketData(user.id);
        await getFavsMarket(user.id);
        await getOwnedCoins(user.id);
    } else await getMarketData();
};
