import { User } from "@constants/DataTypes";
import { getCoins, getFavsMarket, getMarketData } from "@services/CryptoServices";
import { getOwnedCoins } from "@services/UserServices";

/**
 * fetch all required data based on the user's status
 */
export const fetchData = async (user: User) => {
    if (user.isLoggedIn) {
        await getMarketData(user.id);
        await getFavsMarket(user.id);
        await getOwnedCoins(user.id);
    } else await getMarketData();
    await getCoins();
};
